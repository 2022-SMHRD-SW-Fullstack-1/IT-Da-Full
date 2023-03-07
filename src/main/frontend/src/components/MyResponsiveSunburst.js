import React from 'react'
import { ResponsiveSunburst } from '@nivo/sunburst'

const MyResponsiveSunburst = ({ data }) => {
   return(
   <ResponsiveSunburst
       data={data}
       margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
       id="name"
       value="loc"
       cornerRadius={2}
       borderWidth={2}
       borderColor="#ffffff"
       colors={['rgb(0, 138, 204)', 'rgb(186, 186, 186)']}
       childColor={{
           from: 'color',
           modifiers: [
               [
                   'brighter',
                   0.7
               ]
           ]
       }}
       arcLabel="id"
       enableArcLabels={true}
       arcLabelsSkipAngle={10}
       arcLabelsTextColor="#000000"
   />
)}

export default MyResponsiveSunburst