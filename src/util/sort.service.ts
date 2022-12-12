export class SortService {

    getDistance= (hospitalX:number, hospitalY:number, patientX:number, patientY:number)=>{
        const xDifference = hospitalX - patientX
        const yDifference = hospitalY - patientY
        
        const distance = Math.sqrt((xDifference * xDifference) + (yDifference * yDifference))
        return distance
    }

    sortByDistance = (hospitals, patientX:number, patientY:number)=>{
        const result = hospitals.map((hospital) => {
            const distance = this.getDistance(hospital.x, hospital.y, patientX, patientY )
            return {
                hospitalName: hospital.hospitalName,
                division: hospital.division,
                phoneNumber: hospital.phoneNumber,
                address: hospital.address,
                language1Englsh: hospital.language1English,
                language2ChineseCN: hospital.language2ChineseCN,
                language3ChineseTW: hospital.language3ChineseTW,
                language4Vietnamese: hospital.language4Vietnamese,
                language5Mongolian: hospital.language5Mongolian,
                language6Thai: hospital.language6Thai,
                language7Russian: hospital.language7Russian,
                language8Kazakh: hospital.language8Kazakh,
                language9Japanese: hospital.language9Japanese,
                distance: distance
            }
            
        }).sort((a, b) => {return a.distance - b.distance}).slice(0, 5)
        return result;
    }
}