import { IInputs, IOutputs } from "./generated/ManifestTypes";
import { Component } from "react";

export class NoReferenceLink implements ComponentFramework.StandardControl<IInputs, IOutputs> {

    // Reference to the control container HTMLDivElement
    // This element contains all elements of our custom control example
    private _container: HTMLDivElement;

    // Flag if control view has been rendered
    private _controlViewRendered: Boolean;

	/**
	 * Empty constructor.
	 */
	constructor()
	{

	}

	/**
	 * Used to initialize the control instance. Controls can kick off remote server calls and other initialization actions here.
	 * Data-set values are not initialized here, use updateView.
	 * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to property names defined in the manifest, as well as utility functions.
	 * @param notifyOutputChanged A callback method to alert the framework that the control has new outputs ready to be retrieved asynchronously.
	 * @param state A piece of data that persists in one session for a single user. Can be set at any point in a controls life cycle by calling 'setControlState' in the Mode interface.
	 * @param container If a control is marked control-type='standard', it will receive an empty div element within which it can render its content.
	 */
	public init(context: ComponentFramework.Context<IInputs>, notifyOutputChanged: () => void, state: ComponentFramework.Dictionary, container:HTMLDivElement)
	{
        // Add control initialization code
        this._container = container;
	}


	/**
	 * Called when any value in the property bag has changed. This includes field values, data-sets, global values such as container height and width, offline status, control metadata values such as label, visible, etc.
	 * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to names defined in the manifest, as well as utility functions
	 */
    public async updateView(context: ComponentFramework.Context<IInputs>) : Promise<any>
    {
        // Add code to update control view
        try {
            let id: string = context.parameters.entityIdAttribute.raw!;
            let logicalName: string = context.parameters.entitLogicalNameAttribute.raw!;

            // get the entity metadat to validate exists and retrieve primary name field
            let metadata = await context.utils.getEntityMetadata(logicalName);

            if (metadata == null) {
                return;
            }

            // TODO: get primary name field attribute, define in select retrieve
            let nameField = metadata.PrimaryNameAttribute;

            // retrive the entity record to validate it exists        
            let entity = await context.webAPI.retrieveRecord(logicalName, id, `?$select=${nameField}`);

            if (entity == null) {
                return;
            }

            this._container.innerText = `${entity[nameField]}`;
            this._container.addEventListener("click", () => {
                context.navigation.openForm({ entityName: logicalName, entityId: id, useQuickCreateForm: false });
            });

        } catch (e) {
            debugger;
        }
        // generate link with onclick event handler
        // on click event handler calls open form
    }

	/** 
	 * It is called by the framework prior to a control receiving new data. 
	 * @returns an object based on nomenclature defined in manifest, expecting object[s] for property marked as “bound” or “output”
	 */
	public getOutputs(): IOutputs
	{
		return {};
	}

	/** 
	 * Called when the control is to be removed from the DOM tree. Controls should use this call for cleanup.
	 * i.e. cancelling any pending remote calls, removing listeners, etc.
	 */
	public destroy(): void
	{
		// Add code to cleanup control if necessary
	}
}