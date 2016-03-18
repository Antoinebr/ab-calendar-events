module.exports = function(grunt){

  grunt.initConfig({

    /**
    *
    * auto_install
    * Permet d'installer les packages depuis le package.json
    *
    */
    auto_install: {
      local: {},
      subdir: {
        options: {
          cwd: 'subdir',
          stdout: true,
          stderr: true,
          failOnError: true,
          npm: '--production'
        }
      }
    },



    concat: {
      options: {
        //separator: ';', // va ajouter un ; a la fin de chaque fichier
      },
      fusion: {
        src: [
          'js/parts/doc_ready_start.js',


          // calendar
          'js/parts/cal_php.js',
          'js/parts/cal_get_sessions.js',
          'js/parts/cal_inject_calendar.js',
          'js/parts/cal_load_session.js',


          'js/parts/doc_ready_end.js'
        ],
        // Selectionne les js dans l'odre donné
        dest: 'js/app.js', // crer un fichier de destination
      },
    },

    watch: {
      scripts: {
        files: ['js/parts/*.js','js/parts/*/*.js'],
        tasks: ['concat'],
        options: {
          spawn: false,
        },
      },
    }

  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-auto-install');
  //grunt.registerTask('default', ['concat']);
  grunt.registerTask('default', ['watch']);
  // créer une tache à executer, ici on execute Concat puis Uglify
};
