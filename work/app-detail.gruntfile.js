module.exports = function (grunt) {
  "use strict";
  var path = require("path"),
      releasePath = "build/",   //publish目录（cdn发布地址）
      dist = "dist";      //开发时的合并代码目录

  // Project configuration.
  grunt.config.init({
      pkg : grunt.file.readJSON("package.json"),
      version : "<%= pkg.version %>",
      versionSuffix : "<%= pkg.version %>",
      headHash : "",
      headShortHash : "",

      /*
      jshint : {
          options : {
              boss : true,
              curly : true,
              eqeqeq : true,
              eqnull : true,
              expr : true,
              immed : true,
              noarg : false,
              smarttabs : true,
              trailing : true,
              undef : true,
              unused : true,
              latedef : true,
              newcap : true,
              sub : true,
              browser : true,
              evil : false,
              globals : {
                  define : false,
                  require : false,
                  requirejs : false,
                  namespace : false,
                  console : true,
                  _define : true,
                  module : false,
                  $ : true
              }
          },
          taobao : {
              files : {
                  src : [
                      "*.js",
                      "src/js/*.js",
                      "!src/js/atc/*.js",
                      "!src/js/template/*.js"
                  ]
              }
          }
      },
      */

      clean : [dist],

      less : {
          dev : {
              files : {
                  "dist/detail_1x.css" : "src/less/detail_1x.less",
                  "dist/detail_2x.css" : "src/less/detail_2x.less"
              }
          }
      },

      atc: {
          detail : {
              src : ['src/js/detail/template'],
              namespace : 'app.detail.template',
              output : 'src/js/detail/atc',
              cloneHelpers : false
          }/*,
          minor: {
              src: ['src/js/minor/template'],
              namespace: 'app.detail.minor.template',
              output: 'src/js/minor/atc',
              cloneHelpers: false
          },
          rate: {
              src: ['js/rate/template'],
              namespace: 'taobao.plugins.item.rate.template',
              output: 'js/rate/atc',
              cloneHelpers: false
          },
          ticket : {
              src : ['src/extension/ticket/template'],
              namespace : 'app.detail.template',//'taobao.plugins.item.detail.template.ticket',
              output : 'src/extension/ticket/atc',
              cloneHelpers : false
          },
          idle: {
              src: ['js/extension/idle/template'],
              namespace: 'taobao.plugins.item.detail.template.idle',
              output: 'js/extension/idle/atc',
              cloneHelpers: false
          }*/
      },

      concat : {
          /*
          mixsln : {
              src : [
                  './modules/mixsln/mixsln.js',
                  './modules/mixsln/plugins/*.js'
              ],
              dest: path.join(dist, 'mixsln-all') + ".js"
          },*/
          common : {
              src : [
                  './src/js/common/*.js'
              ],
              dest : path.join(dist, 'common') + ".js"
          },
          detail : {
              src : [
                  './src/js/detail/atc/*.js',
                  './src/js/detail/view/*.js',
                  './src/js/detail/detailModel.js',
                  './src/js/detail/detailController.js',
                  './src/js/detail/detailView.js',
                  './src/js/detail/detail.js'
              ],
              dest : path.join(dist, 'detail') + ".js"
          },
          /*jhs : {
              src : ['./src/extension/jhs/js/*.js'],
              dest : path.join(dist, 'detail_jhs') + ".js"
          },
          seckill : {
              src : ['./src/extension/seckill/js/*.js'],
              dest : path.join(dist,'detail_seckill') + '.js'
          },
          minor: {
              src: [
                  './src/js/minor/atc/*.js',
                  './src/js/minor/view/*.js',
                  './src/js/minor/minorModel.js',
                  './src/js/minor/minorView.js',
                  './src/js/minor/minor.js'
              ],
              dest: path.join(dist, 'detail_minor') + ".js"
          },
          ticket : {
              src : [
                  './src/extension/ticket/atc/ticketSkuInfo.js',
                  './src/extension/ticket/atc/ticketCal.js',
                  './src/extension/ticket/atc/ticketSpu.js',
                  './src/extension/ticket/js/event.js',
                  './src/extension/ticket/js/attribute.js',
                  './src/extension/ticket/js/sku.js',
                  './src/extension/ticket/js/calendar.js',
                  './src/extension/ticket/js/TicketSkuView.js',
                  './src/extension/ticket/js/TicketCalView.js',
                  './src/extension/ticket/js/TicketSpuView.js'
              ],
              dest : path.join(dist, 'detail_ticket') + ".js"
          },
          
          rate: {
              src: [
                  './js/rate/atc/$helpers.js',
                  './js/rate/atc/rate.js',
                  './js/rate/view/commentView.js',
                  './js/rate/main.js'
              ],
              dest: path.join(dist, 'rate') + ".js"
          },
          
          ext: {
              src: [
                  './js/extension/idle/atc/$helpers.js',
                  './js/extension/idle/atc/itemInfo.js',
                  './js/extension/idle/js/itemInfoView.js',
                  './js/extension/idle/js/actionView.js',
                  './js/extension/twodim/itemInfoView.js',
                  './js/extension/ipad/header.js'
              ],
              dest: path.join(dist, 'detail_ext') + ".js"
          }*/
      },
      removelogging : {
          common : {
              src : path.join(dist, 'common') + ".js",
              dest : 'dist/common_clean.js'
          },
          detail : {
              src : path.join(dist, 'detail') + ".js",
              dest : 'dist/detail_clean.js'
          },
          /*jhs : {
              src : path.join(dist, 'detail_jhs') + ".js",
              dest : 'dist/detail_jhs_clean.js'
          },
          seckill : {
              src : path.join(dist, 'detail_seckill') + ".js",
              dest : 'dist/detail_seckill_clean.js'
          },
          minor: {
              src: path.join(dist, 'detail_minor') + ".js",
              dest: 'dist/detail_minor_clean.js'
          },
          ticket : {
              src : path.join(dist, 'detail_ticket') + ".js",
              dest : 'dist/detail_ticket_clean.js'
          },
          rate: {
              src: path.join(dist, 'rate') + ".js",
              dest: 'dist/rate_clean.js'
          },
          */
      },
      
      uglify : {
          common : {
              src : 'dist/common_clean.js',
              dest : releasePath+'common.js'
          },
          detail : {
              src : 'dist/detail_clean.js',
              dest : releasePath+'detail.js'
          },
          /*jhs : {
              src : 'dist/detail_jhs_clean.js',
              dest : releasePath+'detail_jhs.js'
          },
          seckill : {
              src : 'dist/detail_seckill_clean.js',
              dest : releasePath+'detail_seckill.js'
          },
          minor: {
              src: 'dist/detail_minor_clean.js',
              dest: releasePath+'detail_minor.js'
          },
          ticket : {
              src : 'dist/detail_ticket_clean.js',
              dest : releasePath+'detail_ticket.js'
          },
          detail_page:{
              src:'./js/detail/main.js',
              dest: releasePath + 'detail_page' + ".js"
          },
          rate: {
              src: 'dist/rate_clean.js',
              dest: releasePath+'rate_min.js'
          },
          ext: {
              src: 'dist/detail_ext.js',
              dest: releasePath+'detail_ext_min.js'
          }*/
      },

      cssmin : {
          combine : {
              files : {
                  //'build/item_min.css':  path.join(dist, 'item') + ".css"
                  "build/detail_1x.css" : path.join(dist, 'detail_1x') +".css",
                  "build/detail_2x.css" : path.join(dist, 'detail_2x') +".css"
              }
          }
      },

      watch : {
          js : {
              files : ['<%=concat.common.src%>','<%=concat.detail.src%>','<%=concat.jhs.src%>','<%=concat.seckill.src%>'],
              tasks : ['concat', 'removelogging', 'uglify']
          },

          css : {
              files : ['src/less/*.less', 'src/extension/ticket/css/*.less'],
              tasks : ['less:dev', 'cssmin']
          },

          atc : {
              files : ['src/js/detail/template/*.html' , 'src/extension/ticket/template/*.html'],
              tasks : ['atc']
          }
      }
  });

  // grunt plugins
  //grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks("grunt-atc");
  grunt.loadNpmTasks("grunt-contrib-concat");
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks("grunt-remove-logging");
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-lineending');

  // Default grunt
  grunt.registerTask("default", [ "atc", "concat", "less:dev", "cssmin", "removelogging", "uglify"]);
};
