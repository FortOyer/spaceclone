module.exports = function(grunt) {
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    clean: {
      main: ['build/*']
    },
    browserify: {
      main: compile(true),
      release: compile(false)
    },
    shell: {
      runserver: {
        command: 'python -m SimpleHTTPServer',
        options: {
          execOptions: {
            cwd: 'build' 
          }
        }
      }
    },
    uglify: {
      main: {
        files: [{ 
          expand: true,
          src: 'build/main.js',
          dest: 'build/main.min.js'
        }]
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
        src: "resources/images/**/*",
        dest: "build/images"
      },
      phaser: {
        expand: true,
        flatten: true,
        src: "node_modules/phaser/build/phaser.min.js",
        dest: "build/"
      }
    }
  });
  
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-contrib-copy');

  // Default task(s).
  grunt.registerTask('default', ['clean', 'copy:phaser', 'browserify:main',
                                 'copy:htm', 'copy:images']);
  grunt.registerTask('server', ['shell:runserver']);
} ;

function compile(debug) {
  return {
    files: {
      'build/main.js' : ['src/**/*.ts']
    },
    options: {
      browserifyOptions: {
        debug: debug,
      },
      plugin: [
        [
          'tsify', [{
                "target": "es5",
                "module": "commonjs",
                "noImplicitAny": true,
                "noImplicitReturns": true
            }
          ]
        ]
      ]
    }
  }
}
