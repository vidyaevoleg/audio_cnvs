module.exports = function (grunt) {
	grunt.initConfig({
		coffee: {
			options: {
				bare: true
			},
			scripts: {
				expand: true,
				flatten: true,
				cwd: 'coffee/',	
				src: ['*coffee'],
				dest: 'js/',
				ext: '.js'
			}
		},
	  	compass: {                  // Task
	    	dist: {                   // Target
	      		options: {              // Target options
	        		sassDir: 'sass',
	        		cssDir: 'css',
	      		}
	    	}
	  	}, 		 
		watch: {
			options: {
				liveReload: true
			},
			scripts: {
				files: ['coffee/*.coffee'],
				tasks: ['coffee']
			},
			styles: {
				files: ['sass/*.sass'],
				tasks: ['compass']
			}
		}	
	});

	grunt.loadNpmTasks('grunt-contrib-coffee');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-compass');

	grunt.registerTask('default', ['compass', 'coffee', 'watch']);

};