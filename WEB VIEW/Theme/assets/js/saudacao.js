function = saudacao ()  {
 
d = new Date();
hour = d.getHours();
if(hour < 5)
{
   document.write("Boa Noite");
}
else
if(hour < 8)
{
   document.write("Bom Dia");
}
else
if(hour < 12)
{
   document.write("Bom Dia!");
}
else
if(hour < 18)
{
   document.write("Boa tarde");
}
else
{
   document.write("Boa noite");
}
 
}