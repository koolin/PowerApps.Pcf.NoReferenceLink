# Power Apps PCF No Reference Link

A link styled control that uses string fields for id and entity logical name to create a lookup style link

## Implementation

Assumes that a field containing an entity id and a field containing an entity logical name exist on the entity record.

* The entity id field should be enabled with the control to fill the first required property.

* The entity logical name field should be selected for the 2nd properly.

## Function

The control will query the metadata of the entity to validate it exists, and retrieve the primary name attribute.

Using the primary name attribute the control will attempt to retrieve the entity record with the primary name attribute.  

Then it will display the value of the primary name attribute with an on click handler that calls the navigation.openform to navigate to the entity record.