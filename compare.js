// --------------------------------------------------------
// $ :: JQuery nonconflict reference.
// See :: http://www.tvidesign.co.uk/blog/improve-your-jquery-25-excellent-tips.aspx#tip19
// --------------------------------------------------------
window.$ = window.$jq = jQuery.noConflict();

// --------------------------------------------------------
// cim :: Main cim object exposes various utility functions.
// --------------------------------------------------------
(function(ESDOC, $) {

    // ECMAScript 5 Strict Mode
    "use strict";

    // Initialise comparator options.
    ESDOC.comparator.setOptions({
        uiContainer : '.page-comparator-container'
        //uiContainer : 'dialog'
    });

    // UI state map.
    var uiState = {
        project : undefined,
        comparator : undefined
    };

    // Open comparator.
    var compare = function (project, comparator) {
        if (uiState.project !== project &&
            uiState.comparator !== comparator) {
            // Update ui state.
            uiState.project = project;
            uiState.comparator = comparator;

            // Open comparator.
            // ESDOC.comparator.open({
            //     type : uiState.comparator,
            //     project : uiState.project
            // });
           ESDOC.comparator.openDirect(window.esdocSetupData);
        }
    };

    // OnDocumentReady event handler.
    $(document).ready(function() {
        var project, comparator, msg="";

        // Augment UI.
        $("#compare").button();
        $("#support").button();
        $(".esdoc-version").text("v" + ESDOC.VERSION);

        // Wire UI events.
        $('#compare').click(function () {
            compare($('#project').val(), $('#comparatorType').val());
        });

        // Initialise project.
        project = ESDOC.utils.getURLParam('project');
        if (project) {
            if ($("#project:has(option:contains('" + project + "'))").length) {
                $('#project').val(project);
            } else {
                msg += project + " is an unsupported project.  ";
            }
        }

        // Initialise comparator type.
        comparator = ESDOC.utils.getURLParam('comparator');
        if (comparator) {
            if ($("#comparatorType:has(option:contains('" + comparator + "'))").length) {
                $('#comparatorType').val(comparator);
            } else {
                msg += comparator + " is an unsupported comparator.  ";
            }
        }

        // Open header links.
        $('.page-header img').click(function () {
            ESDOC.utils.openURL("http://es-doc.org", true);
        });
        $('.page-header .page-support-button').click(function () {
            ESDOC.utils.openSupportEmail('Compare');
        });

        // Auto-open.
        $('#compare').click();

        // Display message.
        if (msg) {
            ESDOC.events.trigger("feedback:information", msg + "Reverting to defaults.");
        }
    });

})(this.ESDOC, this.$jq);
