module.exports = {
    title: 'Utshab Roy',
    description: 'Personal projects docs',

    markdown: {
        lineNumbers: true
    },
    themeConfig: {
        nav: [
            { text: 'Home', link: '/' },
            { text: 'Projects', link: '/projects/' },
            { text: 'Git-Profile', link: 'https://github.com/utshab-roy' },
        ],
        sidebar: {
            '/projects/': [
                '',
                'utshabimagemanipulator',
            ],
        }
    },
};