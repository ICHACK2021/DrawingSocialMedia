import React, { useState } from "react";

const Title = ({ bigSize, smallSize, pt }) => {
    return <div className="text-center d-flex justify-content-center">
        <table className="table-sm">
            <thead>
                <tr>
                    <th className={`m-0 p-0 pt-${pt} ${bigSize} text-info`}>P</th>
                    <th className={`m-0 p-0 pt-${pt} ${smallSize} text-secondary`}>icto</th>
                    <th className={`m-0 p-0 pt-${pt} ${bigSize} text-info`}>S</th>
                    <th className={`m-0 p-0 pt-${pt} ${smallSize} text-secondary`}>nap</th>
                </tr>
            </thead>
        </table>
        <br />
    </div >
}

export default Title;