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
 * @param {org.cdm.network.oem.RegisterNewVehicle} newVehicle
 * @transaction
 */
async function RegisterNewVehicle(newVehicle) {

    // if(params.drivenUnits < 0.0){
    // }

    return getAssetRegistry('org.cdm.network.vehicle.Vehicle')
        .then(function(vehicleRegistry){

            // Now add the Vehicle - global function getFactory() called
            var  factory = getFactory();

            var  NS =  'org.cdm.network.vehicle';

            //Set vehicle members
            var  vehicle = factory.newResource(NS,'Vehicle',newVehicle.vehicleId);

            vehicle.vin = newVehicle.vin;
            vehicle.manufacturingDate = newVehicle.manufacturingDate;
            vehicle.drivenUnits = newVehicle.drivenUnits;
            vehicle.unitSystemType = newVehicle.unitSystemType;
            vehicle.operatingHours = newVehicle.operatingHours;

            vehicle.oem = newVehicle.oem;


            // 4. Add to registry
            return vehicleRegistry.add(vehicle);

        });
  
}