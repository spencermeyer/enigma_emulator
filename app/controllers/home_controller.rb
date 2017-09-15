class HomeController < ApplicationController
  def encrypt_key

    one = ["E", "K", "M", "F", "L", "G", "D", "Q", "V", "Z", "N", "T", "O", "W", "Y", "H", "X", "U", "S", "P", "A", "I", "B", "R", "C", "J"]
    two = ["A", "J", "D", "K", "S", "I", "R", "U", "X", "B", "L", "H", "W", "T", "M", "C", "Q", "G", "Z", "N", "P", "Y", "F", "V", "O", "E"]
    three =["J", "V", "I", "U", "B", "H", "T", "C", "D", "Y", "A", "K", "E", "Q", "Z", "P", "O", "S", "G", "X", "N", "R", "M", "W", "F", "L"]    
    four = ["E", "S", "O", "V", "P", "Z", "J", "A", "Y", "Q", "U", "I", "R", "H", "X", "L", "N", "F", "T", "G", "K", "D", "C", "M", "W", "B"]
    ref_a = ["E", "J", "M", "Z", "A", "L", "Y", "X", "V", "B", "W", "F", "C", "R", "Q", "U", "O", "N", "T", "S", "P", "I", "K", "H", "G", "D"]
    ref_b = ["Y", "R", "U", "H", "Q", "S", "L", "D", "P", "X", "N", "G", "O", "K", "M", "I", "E", "B", "F", "Z", "C", "W", "V", "J", "A", "T"]
    plain = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]

    session[:first_rotor] ||= ref_b
    session[:keys_on_first_rotor] = session[:keys_on_first_rotor] ? 
                                    session[:keys_on_first_rotor] + 1 : 1
    Rails.logger.debug "********AWOOGA #{params['input_key']}"

    input_letter = params['input_key']

    letter_out_of_reflector=ref_b[plain.index(input_letter)]

    #letter_out_of_first_rotor = session[:first_rotor][plain.index(input_letter)]
    #session[:first_rotor] = rotate_wheel_one_place(session[:first_rotor])
    Rails.logger.debug session[:first_rotor]
    Rails.logger.debug "key presses #{session[:keys_on_first_rotor]}"

    #output_letter = letter_out_of_first_rotor
    output_letter = letter_out_of_reflector

    # to do:
    # add reflector
    # add in rotor selection
    # add in knock on rotation
    # add rotor choices
    # add a reset
    # change it so that on key press, the rotor rotates and then the lamp lights.
    # put in the classic rotors  https://en.wikipedia.org/wiki/Enigma_rotor_details
    # steckerboard connections  :    interact js ?

    respond_to do |format|
      format.json { render json: {letter: output_letter} }
    end

  end

  private
    def rotate_wheel_one_place(input_array)
      Array(input_array.pop).concat input_array
    end
end
