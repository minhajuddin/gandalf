//Gandalf a jquery wizard
;(function($) {
    $.fn.gandalf = function(options) {
      if (this.length != 1) {
        log('error: no element or more than one element selected');
        return this;
      }

      var data = {};

      //init
      data.currentStep = 0;
      data.totalSteps = $(".step").size();

      var getStep = function(number){
        var $step = $(".step:nth-child(" + number + ")");
        return $step;
      };

      var changeStep= function(number) {
        if(number > data.totalSteps || number <= 0) return;

        var $nextStep = getStep(number);
        var $currentStep = getStep(data.currentStep);
        $currentStep.hide();
        $nextStep.show();
        data.currentStep = number;
      };
      var gotoPrevStep= function() {
        var next = data.currentStep - 1;
        changeStep(next);
        log('moved to the ' + next + ' step');
        return;
      };
      var gotoNextStep= function() {
        var next = data.currentStep + 1;
        changeStep(next);
        log('moved to the ' + next + ' step');
        return;
      };
      var resetCurrentStep= function() {
            data.currentStep = 0;
      };
      var hideAll = function(){
        $("div.step").hide();
      };

      var isFirst = function(){
        return data.currentStep == 0;
      };

      var isLast = function(){
        return data.currentStep == ( data.totalSteps - 1)
      };

      hideAll();
      resetCurrentStep();
      gotoNextStep();
      options['next'].click(function(){
        gotoNextStep();
      });
      options['prev'].click(function(){
        gotoPrevStep();
      });
    };//end of gandalf

    // helper function for logging
    function log(){
      var msg = '[gandalf] ' + Array.prototype.join.call(arguments, '');
      if (window.console && window.console.log) {
        window.console.log(msg);
      }
    }
    })(jQuery);
