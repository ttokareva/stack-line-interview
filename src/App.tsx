import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadData } from './actions';
import store from './store';
import { LineChart } from '@mui/x-charts/LineChart';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import axios from 'axios'
import jsonData from './data.json'
import { format } from "date-fns";
import { Box, CardMedia, Chip, Container, Grid, Typography, FormLabel } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

const App: React.FC = () => {
  const dispatch = useDispatch();
  const data = useSelector((state: any) => state.data);

  useEffect(() => {
    axios.get('data.json')
      .then(response => response.data)
      .then(data => {
        dispatch(loadData(data));
      });
  }, [dispatch]);
console.log(data)
  const columns: GridColDef<(typeof rows)[number]>[] = [
    { field: 'id', headerName: 'Week ending', width: 120 },
    {
      field: 'retailSales',
      headerName: 'Retail sales',
      width: 120
    },
    {
      field: 'wholesaleSales',
      headerName: 'Wholesale sales',
      width: 120
    },
    {
      field: 'unitsSold',
      headerName: 'Units sold',
      width: 120
    },
    {
      field: 'retailerMargin',
      headerName: 'Retailer margin',
      width: 120
    },
  ]

  const currencyFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0
  })

  const rows: any[] = jsonData[0].sales.map((item: { weekEnding: any; retailSales: number | bigint; wholesaleSales: number | bigint; unitsSold: any; retailerMargin: number | bigint; }) => ({ id: item.weekEnding, retailSales: currencyFormatter.format(item.retailSales), wholesaleSales: currencyFormatter.format(item.wholesaleSales), unitsSold: item.unitsSold, retailerMargin: currencyFormatter.format(item.retailerMargin) }))

  return (
    <div>
      {
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2} padding={2} sx={{background: "lightgray"}}>
            <Grid item xs={4}>
              <Card sx={{ maxWidth: 345 }}>
                <CardMedia
                  sx={{ height: 375, padding: "1em 1em 0 1em", objectFit: "contain" }}
                  image={jsonData[0].image}
                  title={jsonData[0].title}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {jsonData[0].title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {jsonData[0].subtitle}
                  </Typography>
                  {jsonData[0].tags.map((key) => (<Chip label={key} sx={{ margin: 0.5, background: 'lightgray' }} />))
                  }
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={8}>
              <Card sx={{ maxWidth: 700, padding: 2 }}>
                <CardContent>
                  <FormLabel sx={{margin: "0 0 0 1em"}}>Retail sales</FormLabel>
                  <LineChart
                    xAxis={[
                      {
                        data: jsonData[0].sales.map((item: any) => new Date(item.weekEnding)),
                        scaleType: 'time',
                        valueFormatter: (date) => format(date, "MMM")
                      }
                    ]}
                    yAxis={[{ id: 'logAxis', scaleType: 'log' }]}
                    series={
                      [{
                        data: jsonData[0].sales.map((item: any) => item.retailSales),
                        showMark: false,

                      },
                      {
                        data: jsonData[0].sales.map((item: any) => item.wholesaleSales),
                        showMark: false,
                      }
                      ]
                    }
                    width={700}
                    height={500}

                  />
                </CardContent>
              </Card>
            </Grid>
            <DataGrid sx={{ padding: 2, 
              '& .MuiDataGrid-cell': {
              backgroundColor: "white",
         }, }}
              rows={rows}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 5 },
                },
              }}
              pageSizeOptions={[5, 10]}
            />
          </Grid>
        </Box>
      }
    </div>
  );
};

export default App;
