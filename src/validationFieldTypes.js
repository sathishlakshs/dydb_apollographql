export const empValidationFields = [
    {type: 'STRING',key: 'firstName'},
    {type: 'STRING',key: 'lastName'},
    {type: 'OBJECT',key: 'skills'},
    {type: 'OBJECT',key: 'addresss'}
];

export const addressValidationFields = [
    {type: 'STRING',key: 'line1'},
    {type: 'STRING',key: 'line2'},
    {type: 'STRING',key: 'zipcode'},
    {type: 'STRING',key: 'city'},
    {type: 'STRING',key: 'state'}
];

export const skillValidationFields = [
    {type: 'STRING',key: 'name'}
];