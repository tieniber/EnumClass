dojo.require("dojo.NodeList-traverse");

dojo.declare('EnumClass.widget.EnumClass', mxui.widget._WidgetBase, {
	mixins : [mendix.addon._Contextable],
	inputargs : {
		name : '',
		enumvalues : [], //value array, keep it compatible with mx4
        glyphicon: '',
        applyToEnum: ''
    },

	//IMPLEMENTATION
	contextGUID : null,
	caption : [],
	classnames : [],
    replacements : [],
	curindex : 0,
	element : null,
	attrHandle: null,
    defaultClass: '',
    elementToApplyTo: null,

	postCreate : function () {
        var i;
		this.caption = [];
		this.classnames = [];
        this.replacements = [];
		// copy data from object array
		for (i = 0; i < this.enumvalues.length; i++) {
			this.caption.push(this.enumvalues[i].captions);
			this.classnames.push(this.enumvalues[i].classnames);
            this.replacements.push(this.enumvalues[i].replacements);
		}
        
		this.element = dojo.doc.createElement('span');
		this.domNode.appendChild(this.element);
        
        switch (this.applyToEnum) { //Select the right element to apply the class too
            case "SELF":
                this.elementToApplyTo = this.element;
                break;
            case "ROW":
                this.elementToApplyTo = this.element.closest(".mx-templategrid-row");
                break;
			case "PARENT":
                this.elementToApplyTo = this.domNode.parentElement;
                break;
            default:
                this.elementToApplyTo = this.element;
        }
        this.defaultClass = dojo.attr(this.elementToApplyTo, 'class');
        
        if (this.defaultClass != '') {this.defaultClass += ' '; }
        
		//this.initContext();
		this.actLoaded();
	},
	update : function (obj, callback) {
		if (obj) {
			this.contextGUID = obj.getGuid();
            this._resetSubscriptions();	
		}
		if (callback) {
			callback();
		}
	},
	_setValueAttr : function (value) {
		var i = this.caption.indexOf(value);
		var classname = "";
        var toDisplay = "";
        
		if ((i >= 0) && (i < this.caption.length)) {
			this.curindex = i;
			classname = this.classnames[i];
            
		} else {
			this.curindex = 0;
			classname = "";
		}
        
        if (this.replacements[i] != "" && this.replacements[i] != undefined) {
            toDisplay = this.replacements[i];
        } else {
            toDisplay = value;
        }
        
        if (this.glyphicon != '') {classname = classname + ' glyphicon glyphicon-' + this.glyphicon + ' '; }
		dojo.attr(this.elementToApplyTo, "class", this.defaultClass + classname); //Set the class to the existing class + enum-determined-class
        
        if (this.glyphicon != '') {
            dojo.attr(this.element, {"innerHTML": "", "title": toDisplay}); //Set innerHTML empty and tooltip to caption
        } else {
            dojo.attr(this.element, "innerHTML", toDisplay); //Set the innerHTML to the value of the attribute
        }
        
	},
	_getValueAttr : function (value) {
		return this.caption[this.curindex];
	},
	//stub function, will be used or replaced by the client environment
	onChange : function () {},
	textChange : function (e) {
		this.onChange();
	},
	_resetSubscriptions : function () {
		if (this.contextGUID) {
			this.attrHandle = this.subscribe({
					guid : this.contextGUID,
					attr : this.name,
					callback : dojo.hitch(this, function (guid, attr, attrValue) {
						this._setValueAttr(attrValue);
					})
				});
		}
	},
	uninitialize: function () {
		if (this.attrHandle ) {
			mx.data.unsubscribe(this.attrHandle);
		}
	}

});
