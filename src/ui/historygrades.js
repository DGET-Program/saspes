/*
    SAS Powerschool Enhancement Suite - A browser extension to improve the experience of SAS Powerschool.

    Copyright (C) 2018-2019 Gary Kim (gary@ydgkim.com)

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <https://www.gnu.org/licenses/>.

*/

window.addEventListener("load", main, false);
function main() {
    browser.runtime.sendMessage({action: "analytics_send", args: {url: "saspes://temp.lastseengrades",action: "Temp Last Seen Grades Page"}});

    browser.storage.local.get({previous_grades_temp: [], previous_person: ""}).then((returned) => {
        if(returned.previous_grades_temp.length === 0)  {
            let temp = document.createElement("body")
            let temp1 = document.createElement("h3");
            temp1.appendChild(document.createTextNode("Information not yet avaliable"));
            temp.appendChild(temp1);
            document.querySelector('html').replaceChild(temp, document.querySelector('body'));
            document.title = `SAS PES - Last Seen Grades (No Info)`;
            return;
        }
        
        let student_name = document.createTextNode(returned.previous_person);
        document.getElementById("studentname").appendChild(student_name);
        document.title = `SAS PES - ${returned.previous_person}`;
        let info = returned.previous_grades_temp;
        let table = document.querySelector("table#historygradetable");
        for(let i = 0; i < info.length; i++)    {
            let current_row = document.createElement("tr");
            let col1 = document.createElement("td");
            let col2 = document.createElement("td");
            let col3 = document.createElement("td");
            col1.appendChild(document.createTextNode(info[i].name));
            col2.appendChild(document.createTextNode(info[i].grade));
            col3.appendChild(document.createTextNode(info[i].fp));
            current_row.appendChild(col1);
            current_row.appendChild(col2);
            current_row.appendChild(col3);
            table.appendChild(current_row);
        }
    })
}