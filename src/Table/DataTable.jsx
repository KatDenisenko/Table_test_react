import React  from 'react';
import {Table,Icon} from 'semantic-ui-react';
import style from './DataTable.module.css'

const dataTable =({allData,sortData,sortDataFuncAz,sortDataFuncZa, sortNumbers, deleteData,sortSkip})=> {
 return (
<Table celled>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>
        <div className={style.headerCell}>
            <Icon name='sort alphabet up' onClick={()=>sortDataFuncAz('firstName')}/>
            <p className={style.headerCell} onClick={sortSkip} title='Skip sort'>First Name</p>
            <Icon name ='sort alphabet down'onClick={()=>sortDataFuncZa('firstName')}/>
        </div>
         </Table.HeaderCell>
       <Table.HeaderCell>
       <div className={style.headerCell}>
          <Icon name='sort alphabet up' onClick={()=>sortDataFuncAz('lastName')}/>
          <p className={style.headerCell} onClick={sortSkip} title='Skip sort'>Last Name</p>
          <Icon name ='sort alphabet down'onClick={()=>sortDataFuncZa('lastName')}/>
        </div>
         </Table.HeaderCell>
         <Table.HeaderCell>
         <div className={style.phone}>
           Phone
         </div>
           </Table.HeaderCell>
        <Table.HeaderCell>
        <div className={style.headerCell}>
          <Icon name='sort up' onClick={()=>sortNumbers('up')}/>
          <p className={style.headerCell} onClick={sortSkip} title='Skip sort'>Age</p>
          <Icon name ='sort down'onClick={()=>sortNumbers('down')}/>
        </div>
          </Table.HeaderCell>
      </Table.Row>
    </Table.Header>
    <Table.Body>  
      {sortData.length>0? sortData.map(el=>
        <Table.Row key={el.id}>
            <Table.Cell>{el.firstName[0].toUpperCase()+el.firstName.slice(1)}</Table.Cell>
            <Table.Cell>{el.lastName[0].toUpperCase()+el.lastName.slice(1)}</Table.Cell>
            <Table.Cell >
            {el.phone}
            </Table.Cell>
            <Table.Cell>
            <div className={style.ageWrapper}>
            {el.age}
            <Icon name='user delete' color='grey' corner='top right'  id={el.id} onClick={deleteData} />
            </div>
            </Table.Cell>
        </Table.Row>)
        :
      allData.map(el=>
        <Table.Row key={el.id}>
            <Table.Cell>{el.firstName[0].toUpperCase()+el.firstName.slice(1)}</Table.Cell>
            <Table.Cell>{el.lastName[0].toUpperCase()+el.lastName.slice(1)}</Table.Cell>
            <Table.Cell>
            {el.phone}
            </Table.Cell>
            <Table.Cell>
            <div className={style.ageWrapper}>
            {el.age}
            <Icon name='user delete' color='grey' corner='top right' id={el.id} onClick={deleteData} />
            </div>
      </Table.Cell>
      </Table.Row>
      )
      }
    </Table.Body>
  </Table>
 )
}

export default dataTable;

