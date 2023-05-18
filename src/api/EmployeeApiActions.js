export const CreateEmployee = (employee) => {
    console.log("create");
    return new Promise((resolve, reject) => {
        fetch('http://localhost:8080/api/employee', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(employee),
        })
            .then(response => response.json())
            .then(data => {
                resolve(data);
            })
            .catch(error => {
                reject(error);
            });
    });
};

export const UpdateEmployee = (id, updatedEmployee) => {
    return new Promise((resolve, reject) => {
        fetch(`http://localhost:8080/api/employee/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedEmployee),
        })
            .then((response) => response.json())
            .then((data) => {
                resolve(data);
            })
            .catch((error) => {
                reject(error);
            });
    });
};

export const DeleteEmployee = (id) => {
    return new Promise((resolve, reject) => {
        fetch(`http://localhost:8080/api/employee/${id}`, {
            method: 'DELETE',
        })
            .then(() => {
                resolve();
            })
            .catch((error) => {
                reject(error);
            });
    });
};


