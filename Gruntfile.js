module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jshint: {
            files: 'client/scripts/**/*.js'
        },
        watch: {
            client : {
                files: ['client/scripts/**/*.js',
                    'client/views/**/*.html',
                    'client/styles/**/*.scss'
                ],
                tasks: ['jshint', 'uglify','copy','sass'],
                options: {
                    spawn: false
                }
            }
        },
        uglify: {
            build: {
                src: [
                    'client/scripts/client.js',
                    'client/scripts/controllers/*.js',
                    'client/scripts/factories/*.js'
                ],
                dest: 'server/public/assets/scripts/client.min.js'
            }
        },
        sass: {
            dist: {
                files: {
                    'server/public/assets/styles/style.css': 'client/styles/style.scss'
                }
            }
        },
        copy: {
            //angular: {
            //    expand: true,
            //    cwd: 'node_modules',
            //    src: [
            //        "angular/*.js",
            //        "angular/*.map",
            //        "angular-animate/*.js",
            //        "angular-animate/*.map",
            //        "angular-aria/*.js",
            //        "angular-material/*.js",
            //        "angular-messages/*.js",
            //        "angular-route/*.js",
            //        "angular-route/*.map",
            //        "angular-ui-bootstrap/dist/*.js",
            //        "angular-ui-bootstrap/dist/*.css",
            //        "angular-smart-table/dist/*.js",
            //        "angular-smart-table/dist/*.map"
            //    ],
            //    "dest": "server/public/assets/vendors/"
          //  },
            Jquery:{
                expand: true,
                cwd: 'node_modules',
                src:[
                    "jquery/dist/jquery.min.js",
                    "jquery/dist/jquery.min.map"
                ],
                "dest": "server/public/assets/vendors"
            },
            Three:{
                expand: true,
                cwd: 'node_modules',
                src:[
                    "three/build/three.min.js"
                ],
                "dest": "server/public/assets/vendors"
            },
            html: {
                expand: true,
                cwd: 'client/views/',
                src: [
                    "index.html",
                    "routes/*.html",
                    "partials/*.html",
                    "templates/*.html"
                ],
                "dest": "server/public/assets/views/"
            },
            bootstrap: {
                expand: true,
                cwd: "node_modules/bootstrap/",
                src: [
                    "dist/**/*"
                ],
                "dest": "server/public/assets/vendors/bootstrap/"
            }
        }

    });

    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-sass');
    //grunt.loadNpmTasks('grunt-contrib-cssmin');

    grunt.registerTask('default', ['copy', 'jshint', 'uglify','sass']);
};
