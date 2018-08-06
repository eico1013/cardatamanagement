/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';
/**
 * Write your transction processor functions here
 */

/**
 * UpdateVehicleData transaction
 * @param {org.cdm.network.vehicle.UpdateVehicleData} params
 * @transaction
 */
async function UpdateVehicleData(params) {

    const newDrivenUnits = params.newDrivenUnits;
    const newOperatingHours = params.newOperatingHours;

    if(newDrivenUnits < 0.0){
        throw new Error("Driven Units must be positve !");
    }
    if(newOperatingHours < 0.0){
        throw new Error("Driven Units must be positve !");
    }

    // Save the old value of the asset.
    const oldDrivenUnits = params.vehicle.drivenUnits;
    const oldOperatingHours = params.vehicle.operatingHours;

    if(newOperatingHours < oldOperatingHours){
        throw new Error("Operating hours cannot be less than stored ones" + 
        ` \n old value: <${oldOperatingHours}> new value: <${newOperatingHours}>`);
    }

    if(newDrivenUnits < oldDrivenUnits){
        throw new Error("Driven units cannot be less than stored ones" + 
        ` \n old value: <${oldDrivenUnits}> new value: <${newDrivenUnits}>`);
    }

    // Update the asset with the new value.
    params.vehicle.drivenUnits = newDrivenUnits;
    params.vehicle.operatingHours = newOperatingHours;


    // Get the asset registry for the asset.
    const assetRegistry = await getAssetRegistry('org.cdm.network.vehicle.Vehicle');
    // Update the asset in the asset registry.
    await assetRegistry.update(params.vehicle);

    // Emit an event for the modified asset.
    // let event = getFactory().newEvent('org.cdm.network', 'SampleEvent');
    // event.asset = tx.asset;
    // event.oldValue = oldValue;
    // event.newValue = tx.newValue;
    // emit(event);
}