module.exports = function(grunt) {
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            js: {
                src: [
                    'src/js/what3words.js'
                ],
                dest: 'dist/what3words-src.js'
            }
        },
        jshint: {
            files: {
                src: ['src/js/**/*.js']
            }
        },
        uglify: {
            js: {
                files: {
                    'dist/what3words.js': ['dist/what3words-src.js']
                }
            }
        },
        jsdoc: {
            dist: {
                src: ['src/js/**/*.js'],
                options: {
                    destination: 'docs'
                }
            }
        },
        watch: {
            options: {
                livereload: true,
            },
            grunt: {
                files: ['Gruntfile.js'],
                tasks: ['build'],
            },
            js: {
                files: ['src/js/**.js'],
                tasks: ['jshint', 'concat']
            },
            uglify: {
                files: ['dist/js/*-src.js'],
                tasks: ['uglify']
            }
        }
    });

    grunt.registerTask('default', ['watch']);
    grunt.registerTask('nodsstore', function() {
        grunt.file.expand({
            filter: 'isFile',
            cwd: '.'
        }, ['**/.DS_Store']).forEach(function(file) {
            grunt.file.delete(file);
        });
    });
    grunt.registerTask('build', ['nodsstore', 'jshint', 'concat', 'uglify');
    grunt.registerTask('docs', ['jsdoc']);
}
