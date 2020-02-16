export const  employeesPartitioning = (emps, adds, skills) => {
    for (const [i, e] of emps.entries()) {
        emps[i]['addresss'] = [];
        emps[i]['skills'] = [];
        adds.filter(a => { if(a.empId === e.id) { emps[i].addresss.push(a); return ;}});
        skills.filter(s => { if(s.empId === e.id) { emps[i].skills.push(s); return ;}});
        emps[i]['trimAddress'] = dataTrim(emps[i].addresss[0].line1, emps[i].addresss.length - 1);
        emps[i]['trimSkill'] = dataTrim(emps[i].skills[0].name, emps[i].skills.length - 1);
    }
    return emps;
}

export const dataTrim = (label, len) => {
    return len > 0?`${label.substring(0, 10)}... + ${len} more` : `${label.substring(0, 10)} ...`;
}