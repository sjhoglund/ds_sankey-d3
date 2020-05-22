export const message = {
  tables: {
    DEFAULT: [
		{dimensions:['Club','Alcohol-Bev','High'],metrics:["26148"]},
		{dimensions:['Club','Alcohol-Bev','Low'],metrics:[18546]},
		{dimensions:['Club','Alcohol-Bev','Medium'],metrics:[26187]},
		{dimensions:['Club','Food','High'],metrics:[26640]},
		{dimensions:['Club','Food','Low'],metrics:[17990]},
		{dimensions:['Club','Food','Medium'],metrics:[31106]},
		{dimensions:['Club','Non-Alcohol-Bev','High'],metrics:[26667]},
		{dimensions:['Club','Non-Alcohol-Bev','Low'],metrics:[22297]},
		{dimensions:['Club','Non-Alcohol-Bev','Medium'],metrics:[23217]},
		{dimensions:['General Admission','Alcohol-Bev','High'],metrics:[113058]},
		{dimensions:['General Admission','Alcohol-Bev','Low'],metrics:[88173]},
		{dimensions:['General Admission','Alcohol-Bev','Medium'],metrics:[128447]},
		{dimensions:['General Admission','Food','High'],metrics:[146141]},
		{dimensions:['General Admission','Food','Low'],metrics:[85820]},
		{dimensions:['General Admission','Food','Medium'],metrics:[93284]},
		{dimensions:['General Admission','Non-Alcohol-Bev','High'],metrics:[115654]},
		{dimensions:['General Admission','Non-Alcohol-Bev','Low'],metrics:[116976]},
		{dimensions:['General Admission','Non-Alcohol-Bev','Medium'],metrics:[113756]},
		{dimensions:['Stage','Alcohol-Bev','High'],metrics:[5545]},
		{dimensions:['Stage','Alcohol-Bev','Low'],metrics:[6645]},
		{dimensions:['Stage','Alcohol-Bev','Medium'],metrics:[6176]},
		{dimensions:['Stage','Food','High'],metrics:[5823]},
		{dimensions:['Stage','Food','Low'],metrics:[7298]},
		{dimensions:['Stage','Food','Medium'],metrics:[6440]},
		{dimensions:['Stage','Non-Alcohol-Bev','High'],metrics:[11065]},
		{dimensions:['Stage','Non-Alcohol-Bev','Low'],metrics:[3637]},
		{dimensions:['Stage','Non-Alcohol-Bev','Medium'],metrics:[4278]},
		{dimensions:['Stage Club','Alcohol-Bev','High'],metrics:[6536]},
		{dimensions:['Stage Club','Alcohol-Bev','Low'],metrics:[5550]},
		{dimensions:['Stage Club','Alcohol-Bev','Medium'],metrics:[6247]},
		{dimensions:['Stage Club','Food','High'],metrics:[7552]},
		{dimensions:['Stage Club','Food','Low'],metrics:[3852]},
		{dimensions:['Stage Club','Food','Medium'],metrics:[7000]},
		{dimensions:['Stage Club','Non-Alcohol-Bev','High'],metrics:[7626]},
		{dimensions:['Stage Club','Non-Alcohol-Bev','Low'],metrics:[4781]},
		{dimensions:['Stage Club','Non-Alcohol-Bev','Medium'],metrics:[7137]},
		{dimensions:['Suite','Alcohol-Bev','High'],metrics:[24680]},
		{dimensions:['Suite','Alcohol-Bev','Low'],metrics:[23689]},
		{dimensions:['Suite','Alcohol-Bev','Medium'],metrics:[26257]},
		{dimensions:['Suite','Food','High'],metrics:[24271]},
		{dimensions:['Suite','Food','Low'],metrics:[23604]},
		{dimensions:['Suite','Food','Medium'],metrics:[27026]},
		{dimensions:['Suite','Non-Alcohol-Bev','High'],metrics:[22499]},
		{dimensions:['Suite','Non-Alcohol-Bev','Low'],metrics:[23535]},
		{dimensions:['Suite','Non-Alcohol-Bev','Medium'],metrics:[27351]},
    ],
  },
  fields: {
    dimensions: [
      {
        id: 'qt_7luivd0mxb',
        name: 'Ticket_Type',
        type: 'TEXT',
        concept: 'DIMENSION',
      },
      {
        id: 'qt_8luivd0mxb',
        name: 'Concession_Type',
        type: 'TEXT',
        concept: 'DIMENSION',
      },
      {
        id: 'qt_9luivd0mxb',
        name: 'Sales_Level',
        type: 'TEXT',
        concept: 'DIMENSION',
      },
    ],
    metrics: [
      {
        id: 'qt_9luivd0mxb',
        name: 'Guests',
        type: 'NUMBER',
        concept: 'METRIC',
      },
    ],
  },
  style: {
    node_color: {
      value: '#eb8034',
      defaultValue: '#eb8034',
    },
    link_color: {
      value: '#eb8034',
      defaultValue: '#eb8034',
    },
    link_opacity: {
      value: 0.2,
      defaultValue: 0.2,
    },
    show_labels: {
      value: true,
      defaultValue: true,
    },
    font_family: {
	    value: 'Roboto',
	    defaultValue: 'Calibri',
    },
    node_font_size: {
      value: 20,
      defaultValue: 20,
    },
    node_font_color: {
      value: {
        color: '#000000',
      },
      defaultValue: '#000000',
    },
    left_offset: {
      value: 20,
      defaultValue: 20,
    },
    right_offset: {
      value: 20,
      defaultValue: 20,
    },
  },
  theme: {
    themeFillColor: {
      color: '#fff',
      opacity: 1,
    },
    themeFontColor: {
      color: '#616161',
      opacity: 1,
    },
    themeFontFamily: 'Roboto',
    themeAccentFillColor: {
      color: '#4285F4',
      opacity: 1,
    },
    themeAccentFontColor: {
      color: '#EFEFEF',
      opacity: 1,
    },
    themeAccentFontFamily: 'Roboto',
    themeSeriesColor: [
      {
        color: '#4285F4',
        opacity: 1,
      },
      {
        color: '#DB4437',
        opacity: 1,
      },
      {
        color: '#F4B400',
        opacity: 1,
      },
      {
        color: '#0F9D58',
        opacity: 1,
      },
      {
        color: '#AB47BC',
        opacity: 1,
      },
      {
        color: '#00ACC1',
        opacity: 1,
      },
      {
        color: '#FF7043',
        opacity: 1,
      },
      {
        color: '#9E9D24',
        opacity: 1,
      },
      {
        color: '#5C6BC0',
        opacity: 1,
      },
      {
        color: '#F06292',
        opacity: 1,
      },
      {
        color: '#00796b',
        opacity: 1,
      },
      {
        color: '#c2185b',
        opacity: 1,
      },
      {
        color: '#7e57c2',
        opacity: 1,
      },
      {
        color: '#03a9f4',
        opacity: 1,
      },
      {
        color: '#8bc34a',
        opacity: 1,
      },
      {
        color: '#fdd835',
        opacity: 1,
      },
      {
        color: '#fb8c00',
        opacity: 1,
      },
      {
        color: '#8d6e63',
        opacity: 1,
      },
      {
        color: '#9e9e9e',
        opacity: 1,
      },
      {
        color: '#607d8b',
        opacity: 1,
      },
    ],
    themeIncreaseColor: {
      color: '#388e3c',
      opacity: 1,
    },
    themeDecreaseColor: {
      color: '#f44336',
      opacity: 1,
    },
    themeGridColor: {
      color: '#e9e9e9',
      opacity: 1,
    },
  },
  interactions: {
    onClick: {
      value: {
        type: 'FILTER',
        data: {
          concepts: ['qt_7luivd0mxb','qt_9luivd0mxb'],
          values: [['General Admission','High']],
        },
      },
      supportedActions: ['FILTER'],
    },
  },
};
