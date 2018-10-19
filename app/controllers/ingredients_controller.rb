class IngredientsController < ApiController
    # GET /ingredients
  def index
    @ingredients = Ingredient.select("drink_id, description").all
    render json: @ingredients.to_json
  end

end
