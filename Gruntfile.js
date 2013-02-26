module.exports = function(grunt) {

grunt.initConfig({
	cssmin: {
		compress: {
			files: {
				"production/css/screen.css": ["production/css/screen.css"]
			}
		}
	},
	csso: {
		dist: {
			src: 'src/css/screen.css',
			dest:'production/css/screen.min.css'
		}
	},
	compass: {
		dist: {
			options: {
				basePath: 'src/',
				config: 'src/config.rb',
				cssDir: 'css',
				environment: 'production'
			}
		}
	},
	copy: {
	  main: {
		files: [
			 {expand: true, cwd: 'src/img/', src: ['**'], dest: 'production/img'}, // copy all the pics
			 //{expand: true, cwd: 'src/sass', src: ['**'], dest: 'production/sass'}, //im not sure we need that
			 {expand: true, cwd: 'src/css', src: ['**'], dest: 'production/css'},
			 {expand: true, cwd: 'src/js', src: ['**'], dest: 'production/js'}
		]
	  }
	},
	includereplace: {
		dist: {
			options: {
				// Global variables available in all files
				// globals: {
				//  var1: 'one',
				//  var2: 'two',
				//  var3: 'three'
				// },
				// Optional variable prefix & suffix, defaults as shown
				prefix: '@@',
				suffix: ''
			},
			// Files to perform replacements and includes with
			src: 'src/*.html',
			// Destinaion directory to copy files to
			dest: 'production/'
		}
	},
	concat: {
		options: {
			separator: ';'
		},
		dist: {
			'src': ['src/js/jquery.js','src/js/jquery.cycle.all.js','src/js/jquery.scrollTo.js','src/js/common.js'],
			dest: 'production/js/app.js'
		}
	},
	min: {
		'dist': {
			'src': ['src/js/jquery.js','src/js/jquery.cycle.all.js','src/js/jquery.scrollTo.js','src/js/common.js'],
			'dest': 'production/js/app.js'
		}
	},
	imagemin: {
		dist: {
			options: {
				optimizationLevel: 3
			},
			files: {
				'production/img/*.png': 'src/img/*.png'
				//'production/img/*.jpg': 'src/img/vk.jpg'
			}
		}
	},
	watch: {
		files: ['src/sass/*.scss', 'src/*html', 'src/js/*.js'],
		tasks: ['compass', 'copy', 'includereplace', 'concat', 'csso', 'clean']
	},

	clean: ["production/_*.html", "production/css/lib"]
});
		grunt.loadNpmTasks('grunt-contrib-compass');
		grunt.loadNpmTasks('grunt-contrib-cssmin');
		grunt.loadNpmTasks('grunt-include-replace');
		grunt.loadNpmTasks('grunt-contrib-copy');
		grunt.loadNpmTasks('grunt-contrib-watch');
		grunt.loadNpmTasks('grunt-contrib-clean');
		grunt.loadNpmTasks('grunt-contrib-concat');
		grunt.loadNpmTasks('grunt-yui-compressor');
		grunt.loadNpmTasks('grunt-csso');
		grunt.loadNpmTasks('grunt-contrib-imagemin');


		grunt.registerTask('default', 'watch');

};