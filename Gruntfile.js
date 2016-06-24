module.exports = function(grunt) {
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        clean: {
            rebuild: ['dist/*']
        },
        concat: {
            options: {
                banner: '(function() {\n',
                footer: '})();'
            },
            js: {
                src: [
                    'src/js/Bootstrap.js',
                    'src/js/Xhr.js',
                    'src/js/Utils.js',
                    'src/js/Geocoder.js'
                ],
                dest: 'dist/W3W.Geocoder.js'
            }
        },
        jshint: {
            options: {
                jshintrc: true
            },
            beforeconcat: ['src/js/**.js'],
            afterconcat: ['dist/W3W.Geocoder.js'],
            grunt: ['Gruntfile.js']
        },
        uglify: {
            js: {
                files: {
                    'dist/W3W.Geocoder.min.js': ['dist/W3W.Geocoder.js']
                }
            }
        },
        jasmine: {
            js: {
                src: 'dist/W3W.Geocoder.js',
                options: {
                    specs: 'test/js/**/*.spec.js',
                    vendor: ['node_modules/jasmine-expect/dist/jasmine-matchers.js'],
                    template: 'test/js/templates/SpecRunner.tmpl',
                    templateOptions: {
                        api_key: process.env.W3W_API_KEY
                    },
                    '--web-security' : false,
                    '--local-to-remote-url-access' : true,
                    '--ignore-ssl-errors' : true
                }
            }
        },
        watch: {
            options: {
                livereload: true,
            },
            grunt: {
                files: ['Gruntfile.js'],
                tasks: ['jshint:grunt', 'build'],
            },
            js: {
                files: ['src/js/**.js'],
                tasks: ['jshint', 'concat']
            },
            uglify: {
                files: ['dist/*.js', '!dist/*.min.js'],
                tasks: ['uglify']
            },
            test: {
                files: ['dist/*.js', '!dist/*.min.js', 'test/js/**/*.tmpl', 'test/js/specs/**/*.js'],
                tasks: ['test']
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
    grunt.registerTask('test', ['jasmine']);
    grunt.registerTask('build', ['nodsstore', 'jshint', 'concat', 'uglify']);
    grunt.registerTask('rebuild', ['clean', 'build', 'test']);
};
