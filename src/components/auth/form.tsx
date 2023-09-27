import React from 'react';

interface Props {
  type: string;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (event: React.SyntheticEvent) => void;
  authForm: { email: string; password: string };
}

const AuthForm = (props: Props) => {
  return (
    <form
      onSubmit={props.onSubmit}
      className='mt-6'
      title={props.type === 'register' ? 'Registration Form' : 'Login Form'}
    >
      <fieldset>
        <label className='block'>Email Address</label>
        <input
          value={props.authForm.email}
          type='email'
          name='email'
          onChange={props.handleChange}
          placeholder='Enter Email Address'
          className='appearance-none block w-full py-3 pr-5 bg-transparent border border-rose-200 rounded-lg placeholder-gray-400/70 pl-4 rtl:pr-4 rtl:pl-5 focus:border-rose-400 focus:ring-rose-300 focus:outline-none focus:ring focus:ring-opacity-40'
          required
        />
      </fieldset>

      <fieldset className='mt-4'>
        <label className='block'>Password</label>
        <input
          value={props.authForm.password}
          type='password'
          name='password'
          onChange={props.handleChange}
          placeholder='Enter Password'
          className='appearance-none block w-full py-3 pr-5 bg-transparent border border-rose-200 rounded-lg placeholder-gray-400/70 pl-4 rtl:pr-4 rtl:pl-5 focus:border-rose-400 focus:ring-rose-300 focus:outline-none focus:ring focus:ring-opacity-40'
          required
        />
      </fieldset>

      <button
        type='submit'
        className='w-full block px-4 py-3 mt-6 text-sm text-white capitalize transition-colors duration-200 bg-rose-700 border rounded-md gap-x-2 hover:bg-transparent hover:text-rose-700 hover:border-rose-700 active:ring-2 active:ring-rose-700'
      >
        {props.type === 'register' ? 'Register with email' : 'Login with email'}
      </button>
    </form>
  );
};

export default AuthForm;
