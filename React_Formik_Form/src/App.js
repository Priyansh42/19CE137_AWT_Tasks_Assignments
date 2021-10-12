import {Styles} from './Styles';
import {Form, Formik, useField} from 'formik';
import * as Yup from 'yup';

const CustomTextInput=({label,...props}) => {
  const [field,meta]=useField(props);

  return(
    <>
      <label htmlFor={props.id || props.name}>{label}</label>
      <input className="text-input" {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) :null}
    </>
  )
}

const CustomCheckBox=({children,...props}) => {
  const [field,meta]=useField(props,'checkbox');

  return(
    <>
      <label className="checkbox">
      <input type="checkbox" {...field} {...props} />
      {children}
      </label>
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) :null}
    </>
  )
}

const CustomSelect=({label,...props}) => {
  const [field,meta]=useField(props);

  return(
    <>
      <label htmlFor={props.id || props.name}>{label}</label>
      <select {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) :null}
    </>
  )
}

function App() {
  return (
    <Styles>
      <Formik
        initialValues={{
          name: '',
          bdate: '',
          gender: '',
          email: '',
          phone: '',
          address: '',
          acceptedTerms: false,
        }}
        validationSchema={Yup.object({
          name: Yup.string()
          .max(30,'Must be 30 characters or less')
          .required('Required'),
          bdate: Yup.date()
          .required('Required'),
          gender: Yup.string()
          .oneOf(['Male','Female','Other'],'Invalid Gender'),
          email: Yup.string()
          .email('Invalid email address')
          .required('Required'),
          phone: Yup.string()
          .min(10,'Must contain 10 digits')
          .max(10,'Must be 10 digits or less')
          .required('Required'),
          address: Yup.string()
          .max(100,'Must be 100 characters or less')
          .required('Required'),
          acceptedTerms: Yup.boolean()
          .required('Required')
          .oneOf([true],'You must accept the terms and conditions'),
        })}
        onSubmit={(values, {setSubmitting, resetForm}) => {
          setTimeout(() => {
            alert(JSON.stringify(values,null,2));
            resetForm();
            setSubmitting(false);
          },3000)
        }}
      >

        {props => (
          <Form>
            <h1>Personal Info Form</h1>
            <CustomTextInput label="Name" name="name" type="text" placeholder="Ex. Priyansh Shah"/>
            <CustomTextInput label="Birth Date" name="bdate" type="date"/>
            <CustomSelect label="Gender" name="gender">
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </CustomSelect> 
            <CustomTextInput label="Email" name="email" type="text" placeholder="Ex. abc@example.com"/>
            <CustomTextInput label="Phone Number" name="phone" type="text" placeholder="Ex. 0123456789"/>
            <CustomTextInput label="Address" name="address" type="textarea" placeholder="Your Address here"/>
            <CustomCheckBox name="acceptedTerms">
              All the above information is correct
            </CustomCheckBox>
            <button type="submit">{props.isSubmitting ? 'Loading...':'Submit'}</button>
          </Form>
        )}
      </Formik>
    </Styles>
  );
}

export default App;
