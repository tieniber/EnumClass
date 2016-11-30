define([
	"dojo/_base/declare",
  "mxui/widget/_WidgetBase",
  'dojo/_base/lang',
  "dojo/dom-construct",
  "dojo/dom-attr",
  "dojo/NodeList-traverse"
], function (declare, _WidgetBase, lang, domConstruct, domAttr) {
	"use strict";

	// Declare widget"s prototype.
	return declare("EnumClass.widget.EnumClass", [_WidgetBase], {

    // Set in Modeler
    name : "",
    enumvalues : [], //value array, keep it compatible with mx4
    glyphicon: "",
    applyToEnum: "",
    associationClassName: "",

    // internal variables
    contextGUID : null,
    caption : [],
    classnames : [],
    replacements : [],
    curindex : 0,
    element : null,
    attrHandle: null,
    objHandle: null,
    defaultClass: "",
    elementToApplyTo: null,
	showWidget: true,
	referenceEntity: null,
	_referenceName: null,
	attributeType: "primitive",

    postCreate : function () {

		//Polyfill so we can use element.closest in IE
		// matches polyfill
		window.Element && function(ElementPrototype) {
		    ElementPrototype.matches = ElementPrototype.matches ||
		    ElementPrototype.matchesSelector ||
		    ElementPrototype.webkitMatchesSelector ||
		    ElementPrototype.msMatchesSelector ||
		    function(selector) {
		        var node = this, nodes = (node.parentNode || node.document).querySelectorAll(selector), i = -1;
		        while (nodes[++i] && nodes[i] != node);
		        return !!nodes[i];
		    }
		}(Element.prototype);

		// closest polyfill
		window.Element && function(ElementPrototype) {
		    ElementPrototype.closest = ElementPrototype.closest ||
		    function(selector) {
		        var el = this;
		        while (el.matches && !el.matches(selector)) el = el.parentNode;
		        return el.matches ? el : null;
		    }
		}(Element.prototype);

		//End polyfill

    // STYLE BY REFERENCE
		if (this.referenceEntity) {
			this._referenceName = this.referenceEntity.split("/")[0];
		}

		this.caption = [];
		this.classnames = [];
		this.replacements = [];
		// copy data from object array
		for (var i = 0; i < this.enumvalues.length; i++) {
			this.caption.push(this.enumvalues[i].captions);
			this.classnames.push(this.enumvalues[i].classnames);
			this.replacements.push(this.enumvalues[i].replacements);
		}

		this.element = domConstruct.create("span");
		this.domNode.appendChild(this.element);

		if (!this.showWidget) {
			domAttr.set(this.element, "style", "display:none;");
		}

		switch (this.applyToEnum) { //Select the right element to apply the class too
		case "SELF":
			this.elementToApplyTo = this.element;
			break;
		case "ROW":
			this.elementToApplyTo = this.element.closest(".mx-templategrid-row");
			break;
		case "LISTITEM":
			this.elementToApplyTo = this.element.closest(".mx-listview-item");
			break;
		case "PARENT":
			this.elementToApplyTo = this.domNode.parentElement;
			break;
		case "SIBLING":
			this.elementToApplyTo = this.domNode.previousSibling;
			break;
		default:
			this.elementToApplyTo = this.element;
		}
		this.defaultClass = domAttr.get(this.elementToApplyTo, "class");

		if (this.defaultClass !== "") {
			this.defaultClass += " ";
		}
    },

    update : function (obj, callback) {
      if (obj) {
        this.contextGUID = obj.getGuid();
        // check reference
        if (this._referenceName && obj.get(this._referenceName) !== ""){
          // console.log(obj.get(this._referenceName))
          // set the classes
          this.elementToApplyTo.className += " " + this.associationClassName
        }
        this._resetSubscriptions();
      }
      callback();
    },

    _setValueAttr : function (value) {
		if(this.attributeType == "reference") {
			if(value) {
				value = "true";
			} else {
				value = "false";
			}
		}

		if(value === true) {
        	value = "true";
        } else if (value === false) {
        	value = "false";
        }

    });
});

require(["EnumClass/widget/EnumClass"], function() {
    "use strict";
});
