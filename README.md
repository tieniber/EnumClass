# Documentation

## Description
This widget will allow you to add classes to elements, based on an attribute's value. Additionally, you can replace the value by a Glyphicon and give that a certain class. Subsequently, you can add CSS to these classes and thereby base the styling of an element, its parent or its row on the value of a certain attribute.

## Typical usage scenario
* Color a label, based on the value that it displays.
*	Highlight rows in a Template Grid, based on the status of the row object.
*	Show an image for a status attribute, and color the image based on the status value.

## Features and limitations
*	Classes can be added to the element itself, its parent or its Template Grid Row.
*	Values can be replaced by Glyphicons, which can get a tooltip and a class, based on the value.

## Configuration
1.	Add the widget inside an object context.
2.	Select the attribute that contains the value which should determine the class.
3.	Per possible value, specify the class that should be added. Optionally, you can specify a custom caption. This will override the displayed value or will be used as the title attribute of the glyphicon.
4.	Select the element that the class should be applied to: the label itself, its parent or its templategrid row.
5.	When you want to replace the element by a glyphicon, specify the name of the glyphicon.
