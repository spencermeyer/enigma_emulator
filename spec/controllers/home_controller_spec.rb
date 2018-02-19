require 'spec_helper'
require 'rails_helper'

RSpec.describe HomeController do
  describe "GET encrypt_key and a key never maps to itself" do
    #skip 'too early to test the whole path' do
      it "encrypts a key" do
        135.times do
          test_input_key = 'A'
          xhr :post, :encrypt_key, input_key: test_input_key, title: "First post", body: "This is the body"

          expect(response.code).to eq('200')
          expect(response.body).to include('letter')

          parsed_response=JSON.parse(response.body)

          #puts "letter is #{parsed_response['letter']}, rotor is #{parsed_response['rotor']}, number is #{ parsed_response['number'] }"
          expect(parsed_response['letter']).not_to eq(test_input_key)
        end
      end
    #end
  end
  describe 'Some rotor checks' do
    it 'correctly assigns each route the first time through' do
      test_input_key = 'A'
      xhr :post, :encrypt_key, input_key: test_input_key, title: "First post", body: "This is the body"

      expect(assigns(:input_letter)).to eq('A')
      expect(assigns(:letter_out_of_rotor_one)).to eq('E')
      expect(assigns(:letter_out_of_rotor_two)).to eq('S')
      expect(assigns(:letter_out_of_rotor_three)).to eq('G')
      expect(assigns(:letter_out_of_reflector)).to eq('L')
      expect(assigns(:reverse_letter_out_of_rotor_three)).to eq('F')   
      expect(assigns(:reverse_letter_out_of_rotor_two)).to eq('W')   
      expect(assigns(:reverse_letter_out_of_rotor_one)).to eq('N')   
      expect(assigns(:output_letter)).to eq('N')   
    end
  end
  describe 'Reflector check' do
    it 'tests all the routes through the reflector' do
      plain = HomeController::PLAIN
      ref_b = HomeController::REF_B

      plain.each do |letter|
        out_letter         = ref_b[plain.index(letter)]
        reverse_out_letter = ref_b[plain.index(out_letter)]
        expect(reverse_out_letter).to eq(letter)
      end
    end
  end
  describe 'Unique wiring check' do
    it 'all letter map to a different letter across each rotor' do
      plain = HomeController::PLAIN
      [HomeController::ONE, HomeController::TWO, HomeController::THREE].each do |rotor|
        plain.each do |letter|
          out_letter = rotor[plain.index(letter)]
          expect(out_letter).should_not eq(letter)
        end
      end
    end
  end
end
