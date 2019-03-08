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
            { text: 'Blog', link: '/blog/' },
            { text: 'Laravel', link: '/laravel/' },
            { text: 'Git-Profile', link: 'https://github.com/utshab-roy' },
        ],
        sidebar: {
            '/projects/': [
                '',
                'utshabimagemanipulator',
            ],
            '/blog/': [
                '',
                'laravel-medialibrary',
                'form-submit-without-CSRF',
            ],
            '/laravel/': [
                '',
                'lara-blog',
                'lara-ecommerce',
                'lara-qa',
            ],
        }
    },
};