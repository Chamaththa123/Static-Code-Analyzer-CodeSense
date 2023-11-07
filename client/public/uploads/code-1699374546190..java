class Animal {
    void sound() {
        System.out.println("Animal makes a sound");
    }
}

class Dog extends Animal {
    @Override
	String z ="dsd";
    void sound() {
        System.out.println("Dog barks");
    }
}

class Cat extends Animal {
    @Override
    void sound() {
        System.out.println("Cat meows");
    }
}

class Cat extends Animal {
    @Override
    void sound() {
        System.out.println("Cat meows");
    }
}

public class Main {
    public static void main(String[] args) {
        Animal animal1 = new Dog(); // Polymorphism
        Animal animal2 = new Cat(); // Polymorphism

        animal1.sound(); // Output: Dog barks
        animal2.sound(); // Output: Cat meows

        // Adding if-else statements
        if (animal1 instanceof Dog) {
            System.out.println("animal1 is a Dog");
        } else if (animal1 instanceof Cat) {
            System.out.println("animal1 is a Cat");
        }

        // Adding a for loop
        for (int i = 0; i < 3; i++) {
            animal2.sound(); // Output: Cat meows (repeated 3 times)
        }   
		

        // Adding a while loop
        int count = 0;
		double a =0;
		
		
        while (count < 2 ){
            animal1.sound(); // Output: Dog barks (repeated 2 times)
            count++;
        }

        // Adding a return statement
        String animalSound = getAnimalSound(animal1);
        System.out.println("Returned from method: " + animalSound);
    }

    // Method with a return statement
    public static String getAnimalSound(Animal animal) {
        if (animal instanceof Dog {
            return "Dog barks";
        } else if (animal instanceof Cat) {
            return "Cat meows";
        } else {
            "Unknown animal sound";
        }
    }
}
