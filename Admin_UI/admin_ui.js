"use strict";

const AdminUIViewModel = function (Context) {
    const self = this;

    self.userDataSource = ko.observableArray([]);
    self.showData = ko.observable(false);
    self.searchKey = ko.observable();
    self.selectedArray = ko.observableArray([]);
    self.editable = ko.observable(false);
    self.isEditing = ko.observable();
    self.pagingDataSource = ko.observableArray([]);
    self.filteredDataSource = ko.observableArray([]);

    var itemsPerPage = 10;

    self.paginateTable = function (data, itemsPerPage, currentPage) {
        var totalPages = Math.ceil(data.length / itemsPerPage);

        // Slice data for current page
        var startIndex = (currentPage - 1) * itemsPerPage;
        var pageData = data.slice(startIndex, startIndex + itemsPerPage);

        // Update table content
        self.pagingDataSource([]);
        self.showData(false); // Clear existing content
        for (var i = 0; i < pageData.length; i++) {
            self.pagingDataSource.push(pageData[i]);
            // Create table rows based on user data
        }
        self.showData(true);

        // Update pagination elements
        $("#pagination-container").html(""); // Clear existing elements

        var startButton = $('<button>').text("<<");
        startButton.click(function () {
            self.paginateTable(self.userDataSource(), itemsPerPage, 1);
        });

        $("#pagination-container").append(startButton);

        var previousButton = $('<button>').text("<");
        previousButton.click(function () {
            if (currentPage > 1) {
                currentPage--;
                self.paginateTable(self.userDataSource(), itemsPerPage, currentPage);
            }
        });

        $("#pagination-container").append(previousButton);

        for (let i = 1; i <= totalPages; i++) {
            let button = $('<button>').text(i);
            if (i === currentPage) {
                button.addClass('active');
            }
            button.click(() => self.paginateTable(self.userDataSource(), itemsPerPage, i));
            $("#pagination-container").append(button);
        }
        
        var nextButton = $('<button>').text(">");

        nextButton.click(function () {
            if (currentPage < Math.ceil(data.length / itemsPerPage)) {
                currentPage++;
                self.paginateTable(self.userDataSource(), itemsPerPage, currentPage);
            }
        });

        $("#pagination-container").append(nextButton);

        var lastButton = $('<button>').text(">>");

        lastButton.click(function () {
            self.paginateTable(self.userDataSource(), itemsPerPage, totalPages);
        });

        $("#pagination-container").append(lastButton);
    }

    self.fetchAdminUsers = function () {
        fetch("https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json").then((resp) => resp.json()).then(function (data) {
            self.userDataSource(data);
            self.showData(true);
            self.paginateTable(self.userDataSource(), itemsPerPage, 1);
        });
    }

    $(document).ready(function () {
        self.fetchAdminUsers();

        $(document).on("change", "input[name=selection]", function () {
            self.selectedArray.removeAll();
            $("input[name=selectionParent]").prop("checked", $("input[name=selection]:checked").length === $("input[name=selection]").length);

            for (let i = 0; i < $("input[name=selection]:checked").length; i++) {
                self.selectedArray().push($("input[name=selection]:checked")[i].value);
            }

        });

        $(document).on("change", "input[name=selectionParent]", function () {
            $("input[name=selection]").prop("checked", $("input[name=selectionParent]").prop("checked"));
            self.selectedArray.removeAll();
            self.checked = !self.checked;

            for (let i = 0; i < $("input[name=selection]:checked").length; i++) {
                self.selectedArray().push($("input[name=selection]:checked")[i].value);
            }

        });

        $(document).on("ojready", "table#table", function () {
            $("input[name^=\"selection\"]").prop("checked", false);
        });
    });

    document.getElementById("search-box").addEventListener("input", function () {
        self.search_admin();
    });

    self.search_admin = function () {
        self.filteredDataSource([]);
        const search_keyword = document.getElementById("search-box").value;
        self.userDataSource().forEach(element => {
            if (element.email.toLowerCase().includes(search_keyword.toLowerCase()) || element.name.toLowerCase().includes(search_keyword.toLowerCase()) || element.role.toLowerCase().includes(search_keyword.toLowerCase())) {
                self.filteredDataSource.push(element);
            }
        });
        self.paginateTable(self.filteredDataSource(), itemsPerPage, 1);
    };

    self.deleteRecord = function (data) {
        self.userDataSource().forEach(element => {
            if (element.id === data.id) {
                self.userDataSource.remove(element);
            }
        });
        self.paginateTable(self.userDataSource(), itemsPerPage, 1);
    };

    self.editRecord = function (user) {
        self.isEditing(user.id);
    };
    
    self.saveRecord = function (user) {
        if (!user.name || !user.email) {
            alert("Name and email cannot be empty");
            return;
        }
    
        self.editable(false);
        self.isEditing(null);
        self.paginateTable(self.userDataSource(), itemsPerPage, 1);
    };
    

    self.cancelEdit = function () {
        self.editable(false);
        self.isEditing(null);
    };

    self.deleteMultipleRecords = function () {
        for (let i = 0; i < self.selectedArray().length; i++) {
            self.userDataSource().forEach(element => {
                if (element.id === self.selectedArray()[i]) {
                    self.userDataSource.remove(element);
                }
            });
        }
        self.paginateTable(self.userDataSource(), itemsPerPage, 1);
    };
};

ko.applyBindings(new AdminUIViewModel(), document.getElementById("adminui"));
