import React, {useState, useEffect} from "react";
import {
  Formik,
  Field,
  Form,
  useField,
  FieldAttributes,
  FieldArray
} from "formik";
import {
  TextField,
  Button,
  Checkbox,
  Radio,
  FormControlLabel,
  Select,
  MenuItem
} from "@material-ui/core";
import * as yup from "yup";

type MyRadioProps = { label: string } & FieldAttributes<{}>;

const MyRadio: React.FC<MyRadioProps> = ({ label, ...props }) => {
  const [field] = useField<{}>(props);
  return <FormControlLabel {...field} control={<Radio />} label={label} />;
};

const MyTextField: React.FC<FieldAttributes<{}>> = ({
  placeholder,
  style,
  ...props
}) => {
  const [field, meta] = useField<{}>(props);
  return (
    <TextField
      placeholder={placeholder}
      style={style}
      {...field}
 
    />
  );
};

const validationSchema = yup.object({
  dia: yup
    .string()
    .required()
    .max(2)
    .min(2),

    mes: yup
    .string()
    .required()
    .max(2)
    .min(2),

    ano: yup
    .string()
    .required()
    .max(4)
    .min(4),
    hora: yup
    .string()
    .required()
    .max(2)
    .min(2),

    minuto: yup
    .string()
    .required()
    .max(2)
    .min(2),

    par: yup
    .string()
    .required()
    .max(6)
    .min(6),

  pets: yup.array().of(
    yup.object({
      name: yup.string().required()
    })
  )
});

interface List {}

const App: React.FC = () => {
  const [dia, setDia] = useState<any>(null);
  const [mes, setMes] = useState<any>(null);
  const [ano, setAno] = useState<any>(null);
  const [hora, setHora] = useState<any>(null);
  const [minuto, setMinuto] = useState<any>(null);
  const [par, setPar] = useState<any>(null);
  const [list, setList] = useState<List[]>([])

  return (

    <div style={{display: 'flex', alignSelf: 'center', justifyContent:'center', flexDirection: 'column', width: '100vw', marginLeft: '40%'}}>
      <Formik
        validateOnChange={true}
        initialValues={{}}
        validationSchema={validationSchema}
        onSubmit={(values: any) => {

          const novo = `${values.dia},${values.mes},${values.ano},${values.hora}:${values.minuto},${values.par.toUpperCase()},${values.yogurt}`
          
          setList([...list, novo]);

        }}
      >
        {({ values, errors, isSubmitting }) => (
          <Form>
            <h2 style={{display: "flex",  marginLeft: -60}}>Conversor de lista para robô</h2>
            <div style={{display: "flex", flexDirection:'column', marginTop: 30,  marginBottom: 15}}>

            <div style={{display: "flex", flexDirection:'row', marginBottom: 15 }}>


            <MyTextField value={dia} style={{marginRight: 25, width: 50}} placeholder="Dia" name="dia" />
            <MyTextField value={mes} style={{marginRight: 25, width: 50}} placeholder="Mês" name="mes" />
            <MyTextField value={ano} style={{marginRight: 25, width: 50}} placeholder="Ano" name="ano" />
            </div>

            <div style={{display: "flex", flexDirection:'row', marginBottom: 15 }}>

            <MyTextField value={hora} style={{marginRight: 25, width: 50}} placeholder="Hora" name="hora" />
            <MyTextField value={minuto} style={{marginRight: 25, width: 50}} placeholder="Minuto" name="minuto" />
            </div>


            <MyTextField  value={par} style={{marginRight: 25, width: 150}} placeholder="Moeda/Par" name="par"  />
            </div>
            
            
            <div>Tipos</div>
            <MyRadio name="yogurt" type="radio" value="PUTT" label="PUTT" />
            <MyRadio
              name="yogurt"
              type="radio"
              value="CALL"
              label="CALL"
            />
            
            <div>
              <Button style={{background: 'green', color: 'white'}} type="submit">
                gerar
              </Button>
            </div>

         <p style={{fontSize: 14, color: 'red', fontWeight: 'bold',  marginTop: 10}}>ATENÇÃO: PREENCHA TODOS OS CAMPOS</p>

           
          </Form>
        )}
      </Formik>

      <div style={{display: 'flex', flexDirection: 'column', marginTop: 20}}>

      {list.map(itemm => (
         <p style={{fontSize: 14, color: 'black',  margin: 0}}>{itemm}</p>
      ))}
      </div>

      <div>
        <h4>Se gostou e quiser ajudar é só fazer uma doação. Muito Obrigado!</h4>
        <a style={{background: 'blue', color: 'white', textDecoration: 'none', padding: 10, borderRadius: 4}} href="http://mpago.la/19NA3aJ" target="blank">Doar</a>
        {/* <a mp-mode="dftl" href="http://mpago.la/1EPyf2Y" className="blue-ar-l-rn-none">Assinar</a> */}
        
      </div>


    </div>
  );
};

export default App;
