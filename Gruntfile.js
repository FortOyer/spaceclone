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
            cwd: 'build/bin' 
          }
        }
      },
      mergerooms: {
        command: 'python jsonpack.py resources/rooms/ build/gen/rooms.ts',
        options: {
          execOptions: {
            cwd: '.' 
          }
        }
      }
    },
    uglify: {
      main: {
        files: [{ 
          expand: true,
          src: 'build/bin/main.js',
          dest: 'build/bin/main.min.js'
        }]
      }
    },
    copy: {
      htm: {
        expand: true,
        flatten: true,
        src: "resources/web/*",
        dest: "build/bin/"
      },
      resources: {
        expand: true,
        flatten: false,
        cwd: "resources/",
        src: ["images/**/*", "font/**/*"],
        dest: "build/bin/"
      },
      phaser: {
        expand: true,
        flatten: true,
        src: "node_modules/phaser/build/phaser.min.js",
        dest: "build/bin/"
      }
    }
  });
  
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-contrib-copy');

  // Default task(s).
  grunt.registerTask('default', ['clean', 'shell:mergerooms', 'copy:phaser',
                                 'browserify:main', 'copy:htm',
                                 'copy:resources']);

  grunt.registerTask('server', ['shell:runserver']);
} ;

function compile(debug) {
  return {
    files: {
      'build/bin/main.js' : ['src/**/*.ts']
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
