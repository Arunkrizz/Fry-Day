import{u as N,a as v,b as x,j as e,G as C,c as w,d as f,s as y,Q as b,e as U,r as D,M as r,B as s,f as h,g as T,h as V,i as O}from"./index-db8cb588.js";function Q(l){const[n,{isLoading:g}]=N(),i=v(),c=x();return e.jsx("div",{children:e.jsx(C,{clientId:"1086782616571-ai35ufuc30c4l62ffa9eesb4o20abutg.apps.googleusercontent.com",children:e.jsx(w,{onSuccess:async d=>{var t;try{const o=f(d.credential),u=await n({userName:o.name,userPicture:o.picture,userEmail:o.email}).unwrap();i(y({...u})),l.setshowRegisterUserModal(!1),c("/home")}catch(o){b.error(((t=o==null?void 0:o.data)==null?void 0:t.message)||(o==null?void 0:o.error))}},onError:()=>{console.log("Login Failed")}})})})}function R(l){const[n,{isLoading:g}]=U(),i=v(),c=x();return e.jsx("div",{children:e.jsx(C,{clientId:"1086782616571-ai35ufuc30c4l62ffa9eesb4o20abutg.apps.googleusercontent.com",children:e.jsx(w,{onSuccess:async d=>{var t;try{c("/user/home");const o=f(d.credential),u=await n({userName:o.name,userPicture:o.picture,userEmail:o.email}).unwrap();i(y({...u})),l.setShowLoginUserModal(!1)}catch(o){b.error(((t=o==null?void 0:o.data)==null?void 0:t.message)||(o==null?void 0:o.error))}},onError:()=>{console.log("Login Failed")}})})})}const J=({showLoginUserModal:l,setShowLoginUserModal:n,showRegisterUserModal:g,setshowRegisterUserModal:i,registerSubmit:c,userRegisterName:d,setUserRegisterName:t,userRegisterMobile:o,setUserRegisterMobile:u,userRegisterEmail:j,setUserRegisterEmail:G,userRegisterPassword:p,setUserRegisterPassword:I,confirmPassword:E,setConfirmPassword:L,submitHandler:F,userEmail:P,setUserEmail:S,userPassword:B,setUserPassword:A,imageState:W,setImageState:k})=>{const[m,q]=D.useState(""),M=x(),H=async()=>{try{const a=await T(V,j,p);await O(a.user),alert("Verification email sent. Please check your email.")}catch(a){console.error("Error signing up:",a.message)}};return e.jsxs(e.Fragment,{children:[e.jsxs(r,{show:l,onHide:()=>n(!1),children:[e.jsx(r.Header,{closeButton:!0,children:e.jsx(r.Title,{children:"Sign In"})}),e.jsxs(r.Body,{children:[e.jsxs(s,{children:[e.jsxs(s.Group,{controlId:"email",children:[e.jsx(s.Label,{children:"Email"}),e.jsx(s.Control,{type:"email",value:P,onChange:a=>S(a.target.value),isInvalid:!!m}),e.jsx(s.Control.Feedback,{type:"invalid",children:m})]}),e.jsxs(s.Group,{controlId:"password",children:[e.jsx(s.Label,{children:"Password"}),e.jsx(s.Control,{type:"password",value:B,onChange:a=>A(a.target.value)})]})]}),e.jsx("h6",{children:"or sign in with google"})," ",e.jsx(R,{setShowLoginUserModal:n})]}),e.jsxs(r.Footer,{children:[e.jsx(h,{variant:"primary",onClick:F,children:"sign In"}),e.jsx(h,{variant:"primary",onClick:()=>{k(!0),n(!1),M("/forgotPassword")},children:"Forgot Password"})]})]}),e.jsxs(r,{show:g,onHide:()=>i(!1),children:[e.jsx(r.Header,{closeButton:!0,children:e.jsx(r.Title,{children:"Sign Up"})}),e.jsxs(r.Body,{children:[e.jsxs(s,{children:[e.jsxs(s.Group,{controlId:"name",children:[e.jsx(s.Label,{children:"Name"}),e.jsx(s.Control,{type:"text",value:d,onChange:a=>t(a.target.value)})]}),e.jsxs(s.Group,{controlId:"mobile",children:[e.jsx(s.Label,{children:"Mobile"}),e.jsx(s.Control,{type:"tel",value:o,onChange:a=>u(a.target.value)})]}),e.jsxs(s.Group,{controlId:"email",children:[e.jsx(s.Label,{children:"Email"}),e.jsx(s.Control,{type:"email",value:j,onChange:a=>G(a.target.value)})]}),e.jsxs(s.Group,{controlId:"password",children:[e.jsx(s.Label,{children:"Password"}),e.jsx(s.Control,{type:"password",value:p,onChange:a=>I(a.target.value)})]}),e.jsxs(s.Group,{controlId:"confirmPassword",children:[e.jsx(s.Label,{children:"Confirm password"}),e.jsx(s.Control,{type:"password",value:E,onChange:a=>L(a.target.value)})]})]}),e.jsx("h6",{children:"or sign up with google"})," ",e.jsx(Q,{setshowRegisterUserModal:i})]}),e.jsx(r.Footer,{children:e.jsx(h,{variant:"primary",onClick:async a=>{await H(),c(a)},disabled:"",children:"sign Up"})})]})]})};export{J as default};
