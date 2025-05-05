const modelFormData = {
    get: function(){
        const formData = sessionStorage.getItem('formData') ? JSON.parse(sessionStorage.getItem('formData')) : {
            name: "",
            description: "",
            programs: [],
        }

        return formData;
    },
    set: function(formData){
        sessionStorage.setItem('formData', JSON.stringify(formData));
    },
    clear: function(){
        sessionStorage.removeItem('formData');
    },
};

export default modelFormData;