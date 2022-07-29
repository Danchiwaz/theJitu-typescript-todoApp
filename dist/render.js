import { InComplete } from "./InComplete.js";
export const render = (data) => {
    let current_date = new Date().getDate();
    let deleteFuntion = new InComplete();
    //
    return data
        .map((t) => `
   ${!t.completed
        ? `<li class="task-item" data-aos="fade-left"
    data-aos-duration="1000">
    
            <div class="item-top">
            
              <div class="top__title">
                <h4>${t.title}</h4>
              </div>
              <div class="up-del-btns">
                <button class="btn-up" data-id="${t.id}" id="btn-update">
                  update
                </button>
                <button class="btn-up" data-id="${t.id}" id="btn-delete">
                  Delete
                </button>
              </div>
            </div>
            <div class="body">
              <p>
                ${t.description}
              </p>
            </div>
            <h6 class="due-date"  ><input type="checkbox" complete-btn" data-id="${t.id}" />Due in ${new Date(t.due_at).getDate() - current_date} days</h6>
            
          </li>`
        : `<li class="task-item" data-aos="fade-left"
    data-aos-duration="3000">
    
            <div class="item-top">
            
              <div class="top__title">
                <h4>${t.title}</h4>
              </div>
              <div class="up-del-btns">
                <button class="btn-up" data-id="${t.id}" id="btn-delete">
                  <ion-icon name="trash-outline"></ion-icon>
                </button>
              </div>
            </div>
            <div class="body">
              <p>
                ${t.description}
              </p>
            </div>
            <h6 class="due-date">${current_date < new Date(t.due_at).getDate()
            ? `Completed earlier by ${new Date(t.due_at).getDate() - current_date} ${new Date(t.due_at).getDate() - current_date > 1
                ? "days"
                : "day"}`
            : ` Completed Late by ${current_date - new Date(t.due_at).getDate()} days `}</h6>
            
          </li>`}
    
    `)
        .join("");
};
