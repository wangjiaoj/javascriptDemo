     var Row = {
         template: `<div class="iv-row"><slot></slot></div>`,
         data: function() {
             return {}
         },
         computed: {},
         methods: {}
     };
     var Col = {
         props: ['span'],
         template: `<div :class="className"><slot></slot></div>`,
         data: function() {
             return {}
         },
         computed: {
             className: function() {
                 return "iv-col iv-col-" + this.span
             },
         }
     };
     export {
         Row,
         Col
     }