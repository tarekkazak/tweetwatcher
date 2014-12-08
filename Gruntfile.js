module.exports = function(grunt) {
    grunt.initConfig( {
        compass : {
            dist : {
                options: {
                    sassDir:'resources/sass',
                    cssDir: 'resources/stylesheets'
                }
            },
            dev : {
                options : {
                    sassDir:'resources/sass',
                    cssDir: 'resources/stylesheets',
                    watch : true
                }
            }
        },
        cssmin : {
            dist: {
                files : {
                    'build/css/screen.min.css' : ['resources/stylesheets/screen.css']
                },
                options : {
                    noAdvanced : true
                }
            }
        },
        uglify : {
            dist : {
                files : {
                    'build/bundle.min.js' : ['bundle.js']
                }
            }
        },
        browserify : {
            dist : {
                files : {'bundle.js' : ['main.js']}
            },
            dev : {
                files : {'bundle.js' : ['main.js']},
                options : {
                    watch : true

                }
            }
        }

    });
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.registerTask('dist', ['compass:dist', 'browserify:dist', 'cssmin:dist', 'uglify:dist']);

};
