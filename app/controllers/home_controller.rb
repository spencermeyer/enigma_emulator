class HomeController < ApplicationController
  def encrypt_key

    Rails.logger.debug "********AWOOGA #{params['input_key']} "

    input_letter = params['input_key']
    output_letter = input_letter.ord < 122 ? (input_letter.ord + 1).chr : 'a'

    respond_to do |format|
      format.json { render json: {letter: output_letter} }
    end
  end
end
