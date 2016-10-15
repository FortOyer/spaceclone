module.exports = function(grunt) {
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    clean: {
      main: ['build/*']
    },
    shell: {
      runtsc: {
        command: 'tsc -p .'
      },
      runserver: {
        command: 'python -m SimpleHTTPServer',
        options: {
          execOptions: {
            cwd: 'build' 
          }
        }
      }
    },
    copy: {
      htm: {
        expand: true,
        flatten: true,
        src: "resources/web/*",
        dest: "build/"
      },
      images: {
        expand: true,
        flatten: true,
        src: "resources/web/images/**/*",
        dest: "build/images/"
      },
      phaser: {
        expand: true,
        flatten: true,
        src: "node_modules/phaser/build/phaser.js",
        dest: "build/"
      }
    }
  });
  
  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-contrib-copy');

  // Default task(s).
  grunt.registerTask('default', ['clean', 'shell:runtsc', 'copy:htm',
                                 'copy:images','copy:phaser']);
  grunt.registerTask('server', ['shell:runserver']);
} ;