'use strict';
var path = require( 'path' );
var lrSnippet = require( 'grunt-contrib-livereload/lib/utils' ).livereloadSnippet;
var folderMount = function folderMount( connect, point ) {
	return connect.static( path.resolve( point ) );
};


module.exports = function(grunt) {

grunt.initConfig({
	connect: {
		livereload: {
			options: {
				port: 9001,
				base: 'production',
				middleware: function( connect, options ) {
					return [lrSnippet, folderMount( connect, options.base )]
				}
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
				//{expand: true, cwd: 'src/js', src: ['**'], dest: 'production/js'}
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
		dist: {
			'src': [
				'src/js/*.js'
			],
			dest: 'production/js/app.js'
		}
	},
	styleguide: {
		styledocco: {
			options: {
				framework: {
					name: 'styledocco'
				},
				template: {
					// src: 'path/to/templates',
					include: ['production/css/screen.css','production/js/app.js']
				},
				name: 'MySite Style Guide'
			},
			files: {
				'production/docs': 'src/sass/*.scss'
			}
		},
	},
	min: {
		dist: {
			'src': ['production/js/app.js'],
			'dest': 'production/js/app.min.js'
		}
	},
	imagemin: {
		dist: {
			options: {
				optimizationLevel: 3
			},
			files: {
				'production/img/*.png': 'src/img/*.png',
				//'production/img/*.jpg': 'src/img/*.jpg'
			}
		}
	},
	//  doesnt work for now
	// imgo: {
	// 	icons: {
	// 		src: 'production/img/*.png'
	// 	}
	// },
	// watch: {
	// 	files: ['src/sass/*.scss', 'src/*html', 'src/js/*.js'],
	// 	tasks: ['compass', 'copy', 'includereplace', 'concat', 'csso', 'clean']
	// },
	// imagemin?
	regarde: {
		compile: {
			files: ['src/sass/*.scss', 'src/*.html', 'src/js/*.js'],
			tasks: ['compass', 'copy', 'includereplace', 'concat', 'csso', 'clean:dev','livereload']
		},
		reload: {
			files: ['production/*.*', 'production/**.*'],
			tasks: [ 'livereload' ]
		}
	},
	clean: {
		dev: ["production/_*.html", "production/css/lib", "src/css",'production/docs'],
		release: ["production/*",]
	}
	//clean: ["production/_*.html", "production/css/lib", "src/css",'production/docs']
});
	//require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
	grunt.loadNpmTasks('grunt-contrib-compass');
	grunt.loadNpmTasks('grunt-yui-compressor');
	grunt.loadNpmTasks('grunt-include-replace');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-regarde');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-csso');
	grunt.loadNpmTasks('grunt-styleguide');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-livereload');
	// grunt.loadNpmTasks('grunt-imgo');
	grunt.loadNpmTasks('grunt-contrib-imagemin');


	grunt.registerTask( 'default', ['livereload-start', 'connect', 'regarde']);
	grunt.registerTask( 'release', ['clean:release', 'compass', 'copy', 'includereplace', 'concat', 'csso', 'min', 'styleguide']);


};
