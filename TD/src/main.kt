fun main(){
    var ens1=Enseignant("Hajar","Hantouti",2020)
    println(ens1.genererEmail())
    println(ens1.toString())
    var et1=Etudiant("Soumia","EL Khayari",true)
    var et2=Etudiant("Larry","El Khayari")
    println(et2.genererEmail())
    println(et2.toString())
}