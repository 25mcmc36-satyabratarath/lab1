let form = document.getElementById("regForm")

form.addEventListener("submit",function(e)
{
 e.preventDefault()

 let ok = true

 let n = name.value
 let em = email.value
 let p = pass.value
 let d = dob.value
 let ph = phone.value

 nameErr.innerText = ""
 emailErr.innerText = ""
 passErr.innerText = ""
 dobErr.innerText = ""
 phoneErr.innerText = ""

 if(!/^[A-Za-z ]+$/.test(n))
 {
  nameErr.innerText = "Only alphabets allowed"
  ok = false
 }

 if(!/^[^ ]+@[^ ]+\.[a-z]{2,3}$/.test(em))
 {
  emailErr.innerText = "Invalid email"
  ok = false
 }

 let score = 0
 if(/[A-Z]/.test(p)) score++
 if(/[a-z]/.test(p)) score++
 if(/[0-9]/.test(p)) score++
 if(/[^A-Za-z0-9]/.test(p)) score++
 if(p.length >= 8) score++

 if(score < 5)
 {
  passErr.innerText = "Weak password"
  ok = false
 }

 let today = new Date()
 let birth = new Date(d)
 let age = today.getFullYear() - birth.getFullYear()

 if(age < 18)
 {
  dobErr.innerText = "Must be 18+"
  ok = false
 }

 if(!/^[0-9]{10}$/.test(ph))
 {
  phoneErr.innerText = "Enter 10 digits"
  ok = false
 }

 if(ok)
 {
  alert("Registration Successful")
  form.reset()
  strength.innerText = ""
 }

})

pass.addEventListener("input",function()
{
 let s = 0
 if(/[A-Z]/.test(pass.value)) s++
 if(/[a-z]/.test(pass.value)) s++
 if(/[0-9]/.test(pass.value)) s++
 if(/[^A-Za-z0-9]/.test(pass.value)) s++

 let percent = Math.min(100 , s * 25)

 strength.innerText = "Strength : " + percent + "%"
})

