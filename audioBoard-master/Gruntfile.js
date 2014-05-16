module.exports = function(grunt) {
  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    sass: {
      dist: {
        options: {
          // cssmin will minify later
          style: 'expanded'
        },
        files: {
          'css/build/base.css': 'css/base.scss'
        }
      }
    },
       smushit: {
      mygroup: {
        src: ['images/good/**/*.png','images/good/**/*.jpg','images/good/**/*.jpeg'],
        dest: 'images/build'
      }
    },
      compress: {
      main: {
        options: {
          mode: 'gzip'
        },
        expand: true,
        src: ['css/*.css'],
        dest: 'css/gzip'
      }
    },
       cssmetrics: {
        dev: {
            src: [
                'css/build/base.css',
                'css/reset.css'
            ]
        }
    },
    csscomb: {
      dist: {
      options: {
        sortOrder: 'css/cssSorts/sort.json'
      },
      files: {
        'css/build/base.css': ['css/build/base.css'],
      },
    },
  },
    imagemin: {
      dynamic: {
        files: [{
          expand: true,
          cwd: 'images/good/',
          src: ['**/*.{png,jpg,gif}'],
          dest: 'images/build/'
        }]
      }
    },
    watch: {
      options: {
        livereload: true,
      },
      css: {
        files: ['css/*.scss'],
        tasks: ['sass'],
        options: {
          spawn: false,
        }
      },
       images: {
        files: ['images/**/*.{png,jpg,gif}', 'images/*.{png,jpg,gif}'],
        tasks: ['imagemin'],
        options: {
          spawn: false,
        }
      }
    },
    
  });

  // Load the plugin that provides the "uglify" task.
grunt.loadNpmTasks('grunt-contrib-sass');


   grunt.registerTask('default', ['sass']);
   grunt.registerTask('comb', ['csscomb']);
   grunt.registerTask('metric', ['cssmetrics']);
   grunt.registerTask('build', ['smushit', 'compress']);
};