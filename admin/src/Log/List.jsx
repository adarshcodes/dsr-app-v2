import React from 'react';



export const List = ({item}) => {
 return (
          <div class="draft">

        <p>
        Project Name:${item.name}
        </p>

        <p>
        Hours:${item.hours}
        </p>

        <p>
        Team Lead Name:${item.teamlead_name}
        </p>

        <p>
        Date:${item.date}
        </p>


        <div class="box">
        <button type="submit" class="view">View</button> 
        </div>
     </div>
        );
}
