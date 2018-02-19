class HomeController < ApplicationController
    ONE   = ["E", "K", "M", "F", "L", "G", "D", "Q", "V", "Z", "N", "T", "O", "W", "Y", "H", "X", "U", "S", "P", "A", "I", "B", "R", "C", "J"].freeze
    TWO   = ["A", "J", "D", "K", "S", "I", "R", "U", "X", "B", "L", "H", "W", "T", "M", "C", "Q", "G", "Z", "N", "P", "Y", "F", "V", "O", "E"].freeze
    THREE = ["B", "D", "F", "H", "J", "L", "C", "P", "R", "T", "X", "V", "Z", "N", "Y", "E", "I", "W", "G", "A", "K", "M", "U", "S", "Q", "O"].freeze
    FOUR  = ["E", "S", "O", "V", "P", "Z", "J", "A", "Y", "Q", "U", "I", "R", "H", "X", "L", "N", "F", "T", "G", "K", "D", "C", "M", "W", "B"].freeze
    REF_A = ["E", "J", "M", "Z", "A", "L", "Y", "X", "V", "B", "W", "F", "C", "R", "Q", "U", "O", "N", "T", "S", "P", "I", "K", "H", "G", "D"].freeze
    REF_B = ["Y", "R", "U", "H", "Q", "S", "L", "D", "P", "X", "N", "G", "O", "K", "M", "I", "E", "B", "F", "Z", "C", "W", "V", "J", "A", "T"].freeze
    PLAIN = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"].freeze
  
  def encrypt_key
    # if params[:reset] = true                strange things happended here.
    #   reset_session
    # end

    Rails.logger.debug "********INPUT KEY #{params['input_key']}"
    session[:first_rotor]  ||= ONE.dup
    session[:second_rotor] ||= TWO.dup
    session[:third_rotor]  ||= THREE.dup
    session[:num_key_presses_on_first_rotor] = session[:num_key_presses_on_first_rotor] ? 
                                    session[:num_key_presses_on_first_rotor] + 1 : 1 
    # this counts the key presses.  When it gets to 26 we have to rotate the next wheel.

    @input_letter                      = params['input_key']
    @letter_out_of_rotor_one           = session[:first_rotor][PLAIN.index(@input_letter)]
    @letter_out_of_rotor_two           = TWO[PLAIN.index(@letter_out_of_rotor_one)]
    @letter_out_of_rotor_three         = THREE[PLAIN.index(@letter_out_of_rotor_two)]
    @letter_out_of_reflector           = REF_B[PLAIN.index(@letter_out_of_rotor_three)]
    @reverse_letter_out_of_rotor_three = PLAIN[THREE.index(@letter_out_of_reflector)]
    @reverse_letter_out_of_rotor_two   = PLAIN[TWO.index(@reverse_letter_out_of_rotor_three)]
    @reverse_letter_out_of_rotor_one   = PLAIN[session[:first_rotor].index(@reverse_letter_out_of_rotor_two)]
    @output_letter = @reverse_letter_out_of_rotor_one

    if @reverse_letter_out_of_rotor_one == @input_letter
      Rails.logger.debug "AWOOGA THE ROUTE #{@input_letter}, #{@letter_out_of_rotor_one}, #{@letter_out_of_rotor_two}, #{@letter_out_of_rotor_three}, #{@letter_out_of_reflector}, #{@reverse_letter_out_of_rotor_three}, #{@reverse_letter_out_of_rotor_two}, #{@reverse_letter_out_of_rotor_one}"
    end

    session[:first_rotor] = rotate_wheel_one_place(session[:first_rotor])

    # to do:
    #  finish reset functionality.
    # add in rotor selection
    # add in knock on rotation
    # add rotor choices
    # add a reset
    # change it so that on key press, the rotor rotates and then the lamp lights.
    # put in the classic rotors  https://en.wikipedia.org/wiki/Enigma_rotor_details
    # steckerboard connections  :    interact js ?

    respond_to do |format|
      format.json { render json: {letter: @output_letter, window1_letter: session[:first_rotor][0], rotor: session[:first_rotor], number: session[:num_key_presses_on_first_rotor] } }
    end
  end

  private
    def rotate_wheel_one_place(input_array)
      Array(input_array.pop).concat input_array
    end
end
