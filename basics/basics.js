tailwind.config = {
    theme: {
        extend: {
            colors: {
                blue: {
                    primary: '#242e4c',
                    secondary: '#738bfd',
                },
                red: {
                    error: '#f55623',
                },
                grey: {
                    100: '#f3f4f6',
                    300: '#e9eaed',
                    500: '#767e96',
                },
            },
            textColor: {
                    blue: {    
                        500: '#1a2950',
                        700: '#1e1a50',
                    },
                },
            fontFamily: {
                primary: "'Montserrat', sans-serif",
            },
            boxShadow: {
                card: ' 0 8px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
                hover: '0 15px 50px -12px rgb(0 0 0 / 0.25)',
            }
        },
    },
};
