import React from 'react'

export default function RepeatButton({loop, ...props}) {

    return <svg {...props} version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 473.68 473.68">
        <path fill={loop ? '#fff' : 'rgba(255, 255, 255, 0.5)'} d="M473.68,236.844C473.68,106.025,367.644,0,236.844,0C106.036,0,0,106.025,0,236.844 C0,367.636,106.036,473.68,236.844,473.68C367.644,473.68,473.68,367.636,473.68,236.844z"/>
        <g>
            <path fill="var(--dcol3)" d="M331.497,306.965c-12.012,14.824-29.341,11.51-46.42,11.51c-24.543,0-49.079,0-73.622,0
                c-15.164,0-30.324,0-45.488,0c-21.383,0-23.922-20.018-23.687-38.394c9.682,0,19.367,0,29.049,0c2.58,0,4.409-1.159,5.531-2.786
                c1.795-1.963,2.461-4.82,0.568-7.775c-14.237-22.21-28.47-44.419-42.706-66.625c-2.913-4.551-9.222-4.476-12.12,0.045
                c-14.237,22.206-28.47,44.419-42.706,66.625c-2.872,4.48,0.916,10.52,6.021,10.52c9.543,0,19.087,0,28.63,0
                c-0.12,21.611,1.915,43.555,21.634,56.876c18.414,12.438,40.717,9.573,61.831,9.573c28.952,0,57.904,0,86.863,0
                c24.838,0,49.007,1.825,66.561-19.839C362.7,312.788,342.903,292.882,331.497,306.965z"/>
                
            <path fill="var(--dcol3)" d="M389.816,188.442c-9.435,0-18.878,0-28.316,0c0.123-21.611-1.915-43.555-21.634-56.876
                c-18.414-12.438-40.717-9.573-61.831-9.573c-28.952,0-57.904,0-86.863,0c-24.838,0-49.007-1.825-66.561,19.839
                c-11.267,13.908,8.534,33.81,19.94,19.726c12.012-14.824,29.341-11.51,46.42-11.51c24.543,0,49.079,0,73.622,0
                c15.164,0,30.324,0,45.489,0c21.383,0,23.918,20.018,23.687,38.394c-9.786,0-19.573,0-29.363,0c-2.58,0-4.409,1.159-5.531,2.786
                c-1.795,1.963-2.464,4.82-0.568,7.775c14.237,22.21,28.47,44.419,42.706,66.625c2.913,4.551,9.222,4.476,12.12-0.045
                c14.237-22.206,28.47-44.419,42.706-66.625C398.709,194.478,394.924,188.442,389.816,188.442z"/>
        </g>
    </svg>
}
